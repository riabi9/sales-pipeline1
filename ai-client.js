/* Steel Platform — AI Client (browser-side, drop-in)
 *
 * Usage:
 *   <script src="ai-client.js"></script>
 *
 * Then anywhere on the page:
 *   AIClient.chat({ task: 'reply_draft', messages: [...] })
 *     .then(r => console.log(r.content));
 *
 * Storage:  ALL configuration lives in this user's localStorage.
 *           Nothing is sent to any server (Supabase or otherwise) by this script.
 *           AI keys are sent ONLY to the chosen AI provider over HTTPS.
 *
 * Security: localStorage is per-origin and per-browser. It is plaintext —
 *           an XSS vulnerability on this site would leak the keys. For a
 *           steel-trading dashboard with no third-party scripts and a small
 *           team this is generally acceptable; for enterprise compliance
 *           consider running a backend relay (we have the architecture for it).
 */

(function (root) {
  'use strict';

  // ── Storage ────────────────────────────────────────────────────────────
  const LS_KEYS  = 'sp_ai_keys';   // { providerId: { key, metadata, savedAt } }
  const LS_TASKS = 'sp_ai_tasks';  // { taskId: { provider, model, temperature, max_tokens, system_prompt, is_enabled } }

  function loadJSON(lsKey) {
    try { return JSON.parse(localStorage.getItem(lsKey) || '{}'); }
    catch { return {}; }
  }
  function saveJSON(lsKey, obj) {
    localStorage.setItem(lsKey, JSON.stringify(obj));
  }

  function getKeys()                     { return loadJSON(LS_KEYS); }
  function getKey(providerId)            { return getKeys()[providerId] || null; }
  function isConfigured(providerId)      { return !!getKey(providerId); }
  function setKey(providerId, key, metadata = {}) {
    const all = getKeys();
    all[providerId] = { key, metadata, savedAt: new Date().toISOString() };
    saveJSON(LS_KEYS, all);
  }
  function deleteKey(providerId) {
    const all = getKeys();
    delete all[providerId];
    saveJSON(LS_KEYS, all);
  }

  function getTaskConfigs()              { return loadJSON(LS_TASKS); }
  function getTaskConfig(taskId)         { return getTaskConfigs()[taskId] || null; }
  function setTaskConfig(taskId, cfg) {
    const all = getTaskConfigs();
    all[taskId] = { ...all[taskId], ...cfg, savedAt: new Date().toISOString() };
    saveJSON(LS_TASKS, all);
  }
  function deleteTaskConfig(taskId) {
    const all = getTaskConfigs();
    delete all[taskId];
    saveJSON(LS_TASKS, all);
  }

  // ── Provider implementations ───────────────────────────────────────────
  // Each provider exposes: chat(opts) → { content, model, input_tokens, output_tokens }

  // OpenAI-compatible providers share one implementation. Just config differs.
  function makeOpenAICompat(cfg) {
    return async function chat({ apiKey, model, messages, temperature, max_tokens, metadata }) {
      const body = {
        model,
        messages,
        temperature: temperature ?? 0.7,
        max_tokens:  max_tokens  ?? 2000,
      };
      const headers = {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type':  'application/json',
        ...(cfg.extraHeaders || {}),
      };
      const r = await fetch(cfg.url, { method: 'POST', headers, body: JSON.stringify(body) });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(cfg.name + ' ' + r.status + ': ' + txt.slice(0, 400));
      }
      const j = await r.json();
      const choice = j.choices && j.choices[0];
      return {
        content:       (choice && choice.message && choice.message.content) || '',
        model:         j.model || model,
        input_tokens:  (j.usage && j.usage.prompt_tokens)     || null,
        output_tokens: (j.usage && j.usage.completion_tokens) || null,
      };
    };
  }

  // Anthropic — different format (system field, content[] blocks, x-api-key header)
  async function chatAnthropic({ apiKey, model, messages, temperature, max_tokens }) {
    let system;
    const userMsgs = [];
    for (const m of messages) {
      if (m.role === 'system') {
        system = system ? (system + '\n\n' + m.content) : m.content;
      } else {
        userMsgs.push({ role: m.role, content: m.content });
      }
    }
    const body = {
      model,
      messages: userMsgs,
      max_tokens: max_tokens ?? 2000,
      temperature: temperature ?? 0.7,
    };
    if (system) body.system = system;

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const txt = await r.text();
      throw new Error('Anthropic ' + r.status + ': ' + txt.slice(0, 400));
    }
    const j = await r.json();
    const content = (j.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    return {
      content,
      model: j.model || model,
      input_tokens:  (j.usage && j.usage.input_tokens)  || null,
      output_tokens: (j.usage && j.usage.output_tokens) || null,
    };
  }

  // Google Gemini — generativelanguage.googleapis.com, ?key= param, contents/parts format
  async function chatGemini({ apiKey, model, messages, temperature, max_tokens }) {
    let systemInstruction;
    const contents = [];
    for (const m of messages) {
      if (m.role === 'system') {
        if (systemInstruction) systemInstruction.parts.push({ text: m.content });
        else systemInstruction = { parts: [{ text: m.content }] };
      } else {
        contents.push({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        });
      }
    }
    const body = {
      contents,
      generationConfig: {
        temperature: temperature ?? 0.7,
        maxOutputTokens: max_tokens ?? 2000,
      },
    };
    if (systemInstruction) body.systemInstruction = systemInstruction;

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/'
              + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(apiKey);
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const txt = await r.text();
      throw new Error('Gemini ' + r.status + ': ' + txt.slice(0, 400));
    }
    const j = await r.json();
    const cand = j.candidates && j.candidates[0];
    const content = ((cand && cand.content && cand.content.parts) || [])
      .map(p => p.text || '').join('');
    return {
      content,
      model,
      input_tokens:  (j.usageMetadata && j.usageMetadata.promptTokenCount)     || null,
      output_tokens: (j.usageMetadata && j.usageMetadata.candidatesTokenCount) || null,
    };
  }

  // ── Provider catalog ───────────────────────────────────────────────────
  const PROVIDERS = [
    {
      id: 'anthropic',
      name: 'Anthropic',
      defaultModels: [
        'claude-opus-4-7',
        'claude-opus-4-6',
        'claude-sonnet-4-6',
        'claude-haiku-4-5-20251001',
      ],
      signupUrl: 'https://console.anthropic.com/settings/keys',
      hasFreeTier: false,
      chat: chatAnthropic,
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      defaultModels: [
        'gemini-2.0-flash',
        'gemini-2.0-flash-exp',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
      ],
      signupUrl: 'https://aistudio.google.com/app/apikey',
      hasFreeTier: true,
      chat: chatGemini,
    },
    {
      id: 'groq',
      name: 'Groq',
      defaultModels: [
        'llama-3.3-70b-versatile',
        'llama-3.1-8b-instant',
        'mixtral-8x7b-32768',
      ],
      signupUrl: 'https://console.groq.com/keys',
      hasFreeTier: true,
      chat: makeOpenAICompat({
        name: 'Groq',
        url:  'https://api.groq.com/openai/v1/chat/completions',
      }),
    },
    {
      id: 'mistral',
      name: 'Mistral',
      defaultModels: [
        'mistral-large-latest',
        'mistral-small-latest',
        'open-mistral-nemo',
      ],
      signupUrl: 'https://console.mistral.ai/api-keys',
      hasFreeTier: true,
      chat: makeOpenAICompat({
        name: 'Mistral',
        url:  'https://api.mistral.ai/v1/chat/completions',
      }),
    },
    {
      id: 'openrouter',
      name: 'OpenRouter',
      defaultModels: [
        'meta-llama/llama-3.3-70b-instruct:free',
        'deepseek/deepseek-chat-v3-0324:free',
        'google/gemini-2.0-flash-exp:free',
      ],
      signupUrl: 'https://openrouter.ai/keys',
      hasFreeTier: true,
      chat: makeOpenAICompat({
        name: 'OpenRouter',
        url:  'https://openrouter.ai/api/v1/chat/completions',
        // Browser sets Referer automatically, but X-Title is custom and helpful.
        extraHeaders: { 'X-Title': 'Steel Platform' },
      }),
    },
    {
      id: 'cerebras',
      name: 'Cerebras',
      defaultModels: ['llama-3.3-70b', 'llama3.1-8b'],
      signupUrl: 'https://cloud.cerebras.ai',
      hasFreeTier: true,
      chat: makeOpenAICompat({
        name: 'Cerebras',
        url:  'https://api.cerebras.ai/v1/chat/completions',
      }),
    },
    {
      id: 'sambanova',
      name: 'SambaNova',
      defaultModels: [
        'Meta-Llama-3.3-70B-Instruct',
        'Meta-Llama-3.1-405B-Instruct',
      ],
      signupUrl: 'https://cloud.sambanova.ai/apis',
      hasFreeTier: true,
      chat: makeOpenAICompat({
        name: 'SambaNova',
        url:  'https://api.sambanova.ai/v1/chat/completions',
      }),
    },
  ];

  function getProvider(id) {
    return PROVIDERS.find(p => p.id === id) || null;
  }

  // ── Public chat() — routes through task config or explicit provider ────
  async function chat(opts) {
    // opts: { task?, messages, provider?, model?, temperature?, max_tokens? }
    if (!opts || !Array.isArray(opts.messages) || !opts.messages.length) {
      throw new Error('messages[] required');
    }

    let providerId   = opts.provider;
    let modelId      = opts.model;
    let temperature  = opts.temperature;
    let max_tokens   = opts.max_tokens;
    let messages     = opts.messages.slice();

    if (!providerId || !modelId) {
      const cfg = getTaskConfig(opts.task || 'general');
      if (!cfg || cfg.is_enabled === false) {
        throw new Error('No provider configured for task "' + (opts.task || 'general') + '". Open Settings.');
      }
      providerId  = providerId  || cfg.provider;
      modelId     = modelId     || cfg.model;
      temperature = temperature ?? cfg.temperature;
      max_tokens  = max_tokens  ?? cfg.max_tokens;
      // Inject system prompt from task config if caller didn't include one
      if (cfg.system_prompt && !messages.some(m => m.role === 'system')) {
        messages = [{ role: 'system', content: cfg.system_prompt }].concat(messages);
      }
    }

    const stored = getKey(providerId);
    if (!stored || !stored.key) {
      throw new Error('No API key saved for "' + providerId + '". Open Settings.');
    }

    const prov = getProvider(providerId);
    if (!prov) throw new Error('Unknown provider: ' + providerId);

    const result = await prov.chat({
      apiKey: stored.key,
      model: modelId,
      messages,
      temperature,
      max_tokens,
      metadata: stored.metadata,
    });

    return Object.assign({ provider: providerId, task: opts.task || 'general' }, result);
  }

  // Test a key by sending a tiny ping. apiKey + metadata may not yet be saved.
  async function testKey(providerId, apiKey, metadata) {
    const prov = getProvider(providerId);
    if (!prov) return { ok: false, error: 'Unknown provider' };
    try {
      const r = await prov.chat({
        apiKey,
        model: prov.defaultModels[0],
        messages: [{ role: 'user', content: 'ping' }],
        temperature: 0,
        max_tokens: 5,
        metadata: metadata || {},
      });
      return { ok: !!r.content, sample: (r.content || '').slice(0, 60) };
    } catch (e) {
      return { ok: false, error: (e && e.message) || String(e) };
    }
  }

  // ── Public API ─────────────────────────────────────────────────────────
  root.AIClient = {
    providers: PROVIDERS,
    getProvider,
    // keys
    getKeys, getKey, setKey, deleteKey, isConfigured,
    // task config
    getTaskConfigs, getTaskConfig, setTaskConfig, deleteTaskConfig,
    // chat + test
    chat, testKey,
  };
})(window);
