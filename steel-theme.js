/* ============================================================
   STEEL PLATFORM — UNIFIED THEME SYSTEM
   15 presets + custom builder + per-theme background image
   localStorage keys:
     sp_theme         → preset name (e.g. "industrial_dark")
     sp_theme_custom  → JSON: { base, bgImage, bgOpacity, blur, accent }
   ============================================================ */

(function (global) {
  'use strict';

  /* ────── FONT STACKS (brand-authentic per theme) ────── */
  const FONTS = {
    industrial: {
      display: "'Space Grotesk', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'JetBrains Mono', monospace",
      gf: ['Space+Grotesk:wght@400;500;700', 'Inter:wght@400;500;600;700', 'JetBrains+Mono:wght@400;600']
    },
    terminal: {
      display: "'JetBrains Mono', monospace",
      body:    "'JetBrains Mono', monospace",
      mono:    "'JetBrains Mono', monospace",
      gf: ['JetBrains+Mono:wght@400;600;700']
    },
    alpine: {
      display: "'Inter', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'JetBrains Mono', monospace",
      gf: ['Inter:wght@400;500;600;700', 'JetBrains+Mono:wght@400;600']
    },
    blueprint: {
      display: "'Space Grotesk', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'JetBrains Mono', monospace",
      gf: ['Space+Grotesk:wght@500;700', 'Inter:wght@400;500;600', 'JetBrains+Mono:wght@400;600']
    },
    parchment: {
      display: "'Fraunces', serif",
      body:    "'Lora', serif",
      mono:    "'JetBrains Mono', monospace",
      gf: ['Fraunces:wght@500;700', 'Lora:wght@400;500;600', 'JetBrains+Mono:wght@400;600']
    },
    frost: {
      display: "'Inter', -apple-system, sans-serif",
      body:    "'Inter', -apple-system, sans-serif",
      mono:    "'SF Mono', 'JetBrains Mono', monospace",
      gf: ['Inter:wght@400;500;600;700', 'JetBrains+Mono:wght@400;600']
    },
    notion: {
      display: "'Inter', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'IBM Plex Mono', monospace",
      gf: ['Inter:wght@400;500;600;700', 'IBM+Plex+Mono:wght@400;500']
    },
    linear: {
      display: "'Inter Tight', sans-serif",
      body:    "'Inter Tight', sans-serif",
      mono:    "'JetBrains Mono', monospace",
      gf: ['Inter+Tight:wght@400;500;600;700', 'JetBrains+Mono:wght@400;600']
    },
    vercel: {
      display: "'Geist', 'Inter', sans-serif",
      body:    "'Geist', 'Inter', sans-serif",
      mono:    "'Geist Mono', 'JetBrains Mono', monospace",
      gf: ['Inter:wght@400;500;600;700', 'JetBrains+Mono:wght@400;600']
    },
    stripe: {
      display: "'Sohne', 'Inter', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'IBM Plex Mono', monospace",
      gf: ['Inter:wght@400;500;600;700', 'IBM+Plex+Mono:wght@400;500']
    },
    figma: {
      display: "'Inter', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'JetBrains Mono', monospace",
      gf: ['Inter:wght@400;500;600;700', 'JetBrains+Mono:wght@400;600']
    },
    github: {
      display: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body:    "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono:    "ui-monospace, 'SF Mono', Menlo, monospace",
      gf: []
    },
    salesforce: {
      display: "'Salesforce Sans', 'Inter', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'JetBrains Mono', monospace",
      gf: ['Inter:wght@400;500;600;700', 'JetBrains+Mono:wght@400;600']
    },
    sap: {
      display: "'72', 'Inter', sans-serif",
      body:    "'Inter', sans-serif",
      mono:    "'JetBrains Mono', monospace",
      gf: ['Inter:wght@400;500;600;700', 'JetBrains+Mono:wght@400;600']
    }
  };

  /* ────── THEME DEFINITIONS ────── */
  const THEMES = {
    /* ─── ORIGINAL ─── */
    industrial_dark: {
      label: 'Industrial Precision', category: 'Industrial', isDark: true, fonts: 'industrial',
      v: {
        '--bg':'#0a0a09','--surface':'#111110','--surface2':'#1a1a18',
        '--border':'#242422','--border2':'#333330',
        '--text':'#f0efea','--text2':'#a0a09a','--text3':'#606058',
        '--accent':'#e8a020','--accent-bg':'#1e1600','--accent-text':'#e8a020','--accent-fg':'#0a0a09',
        '--accent-dim':'#7a5210',
        '--blue':'#3a78c9','--blue-bg':'#0a1828',
        '--green':'#2a9d6f','--green-bg':'#041a10',
        '--red':'#d44040','--red-bg':'#1a0808',
        '--steel':'#4a6080',
        '--radius':'12px','--radius-sm':'8px','--radius-lg':'16px',
        '--blur':'0px','--shadow':'0 4px 24px rgba(0,0,0,0.4)'
      }
    },
    industrial_light: {
      label: 'Industrial Day', category: 'Industrial', isDark: false, fonts: 'industrial',
      v: {
        '--bg':'#f5f4f0','--surface':'#fffefb','--surface2':'#ebe9e3',
        '--border':'#dbd9d2','--border2':'#c2bfb6',
        '--text':'#1a1a18','--text2':'#52524d','--text3':'#8a8a82',
        '--accent':'#b87510','--accent-bg':'#fdf2de','--accent-text':'#7a4a08','--accent-fg':'#fffefb',
        '--accent-dim':'#d49340',
        '--blue':'#1a5a9c','--blue-bg':'#e8f0f9',
        '--green':'#1f7a55','--green-bg':'#e2f4ee',
        '--red':'#a82828','--red-bg':'#fbeaea',
        '--steel':'#3a4f6c',
        '--radius':'12px','--radius-sm':'8px','--radius-lg':'16px',
        '--blur':'0px','--shadow':'0 4px 24px rgba(0,0,0,0.08)'
      }
    },

    /* ─── THEME OPTIONS (5) ─── */
    terminal: {
      label: 'Terminal', category: 'Industrial', isDark: true, fonts: 'terminal',
      v: {
        '--bg':'#050504','--surface':'#0a0a09','--surface2':'#101010',
        '--border':'#1a1a18','--border2':'#1e2e14',
        '--text':'#c8ffa0','--text2':'#7a9a60','--text3':'#3a4a28',
        '--accent':'#7fff40','--accent-bg':'rgba(127,255,64,0.10)','--accent-text':'#7fff40','--accent-fg':'#050504',
        '--accent-dim':'#3a7820',
        '--blue':'#40c8ff','--blue-bg':'rgba(64,200,255,0.08)',
        '--green':'#7fff40','--green-bg':'rgba(127,255,64,0.08)',
        '--red':'#ff6060','--red-bg':'rgba(255,96,96,0.08)',
        '--steel':'#608060',
        '--radius':'4px','--radius-sm':'3px','--radius-lg':'6px',
        '--blur':'0px','--shadow':'0 0 24px rgba(127,255,64,0.06)'
      }
    },
    alpine: {
      label: 'Alpine', category: 'Light', isDark: false, fonts: 'alpine',
      v: {
        '--bg':'#fafbfc','--surface':'#ffffff','--surface2':'#f4f6fa',
        '--border':'#eaeef5','--border2':'#d8dee8',
        '--text':'#1a2540','--text2':'#536270','--text3':'#9ca8b8',
        '--accent':'#4f6ef7','--accent-bg':'#eef1ff','--accent-text':'#4f6ef7','--accent-fg':'#ffffff',
        '--accent-dim':'#a8b8fc',
        '--blue':'#4f6ef7','--blue-bg':'#eef1ff',
        '--green':'#10a96b','--green-bg':'#e3f7ee',
        '--red':'#e04848','--red-bg':'#fceaea',
        '--steel':'#6a7b95',
        '--radius':'10px','--radius-sm':'7px','--radius-lg':'14px',
        '--blur':'0px','--shadow':'0 4px 16px rgba(20,40,80,0.06)'
      }
    },
    blueprint: {
      label: 'Blueprint', category: 'Industrial', isDark: true, fonts: 'blueprint',
      v: {
        '--bg':'#0a1628','--surface':'#0d1e38','--surface2':'#102a4a',
        '--border':'#162840','--border2':'#1a3050',
        '--text':'#c8dff8','--text2':'#6890b8','--text3':'#384e68',
        '--accent':'#40c8f0','--accent-bg':'rgba(64,200,240,0.12)','--accent-text':'#40c8f0','--accent-fg':'#0a1628',
        '--accent-dim':'#2070a0',
        '--blue':'#40c8f0','--blue-bg':'rgba(64,200,240,0.10)',
        '--green':'#40e090','--green-bg':'rgba(64,224,144,0.08)',
        '--red':'#ff6868','--red-bg':'rgba(255,104,104,0.10)',
        '--steel':'#5a78a8',
        '--radius':'8px','--radius-sm':'6px','--radius-lg':'12px',
        '--blur':'0px','--shadow':'0 4px 24px rgba(0,30,80,0.4)'
      }
    },
    parchment: {
      label: 'Parchment', category: 'Light', isDark: false, fonts: 'parchment',
      v: {
        '--bg':'#f5f0e8','--surface':'#ede8de','--surface2':'#e0d8c8',
        '--border':'#d8d0c0','--border2':'#c8be9e',
        '--text':'#2a1f10','--text2':'#7a6848','--text3':'#a8967a',
        '--accent':'#8b4a00','--accent-bg':'rgba(139,74,0,0.10)','--accent-text':'#5a3000','--accent-fg':'#f5f0e8',
        '--accent-dim':'#c08850',
        '--blue':'#3a5a8a','--blue-bg':'rgba(58,90,138,0.10)',
        '--green':'#4a7a3a','--green-bg':'rgba(74,122,58,0.10)',
        '--red':'#a83a28','--red-bg':'rgba(168,58,40,0.10)',
        '--steel':'#7a6c50',
        '--radius':'6px','--radius-sm':'4px','--radius-lg':'10px',
        '--blur':'0px','--shadow':'0 4px 16px rgba(80,60,20,0.10)'
      }
    },
    frost: {
      label: 'Frost Glass', category: 'Glass', isDark: false, fonts: 'frost',
      v: {
        '--bg':'#e8edf5','--surface':'rgba(255,255,255,0.55)','--surface2':'rgba(255,255,255,0.7)',
        '--border':'rgba(180,200,240,0.3)','--border2':'rgba(180,200,240,0.45)',
        '--text':'#1a1f2e','--text2':'#546080','--text3':'#8090b0',
        '--accent':'#0070f3','--accent-bg':'rgba(0,112,243,0.10)','--accent-text':'#0050c0','--accent-fg':'#ffffff',
        '--accent-dim':'#7aa8e8',
        '--blue':'#0070f3','--blue-bg':'rgba(0,112,243,0.08)',
        '--green':'#00a878','--green-bg':'rgba(0,168,120,0.10)',
        '--red':'#e04848','--red-bg':'rgba(224,72,72,0.10)',
        '--steel':'#5a78a8',
        '--radius':'14px','--radius-sm':'10px','--radius-lg':'18px',
        '--blur':'20px','--shadow':'0 8px 32px rgba(20,40,80,0.10)',
        '--bg-gradient':'linear-gradient(135deg,#dde8f8 0%,#f0e8f8 50%,#e8f0f0 100%)'
      }
    },

    /* ─── FAMOUS BRANDS (8) ─── */
    notion: {
      label: 'Notion', category: 'Productivity', isDark: false, fonts: 'notion',
      v: {
        '--bg':'#ffffff','--surface':'#f7f6f3','--surface2':'#f0ece4',
        '--border':'#ebe9e3','--border2':'#d8d4cc',
        '--text':'#1a1a1a','--text2':'#6b6b6b','--text3':'#a0a0a0',
        '--accent':'#2e75d6','--accent-bg':'rgba(46,117,214,0.08)','--accent-text':'#2e75d6','--accent-fg':'#ffffff',
        '--accent-dim':'#a0c0e8',
        '--blue':'#2e75d6','--blue-bg':'rgba(46,117,214,0.08)',
        '--green':'#0f7b3f','--green-bg':'rgba(15,123,63,0.08)',
        '--red':'#d04545','--red-bg':'rgba(208,69,69,0.08)',
        '--steel':'#7a8090',
        '--radius':'4px','--radius-sm':'3px','--radius-lg':'6px',
        '--blur':'0px','--shadow':'0 1px 2px rgba(0,0,0,0.04)'
      }
    },
    linear: {
      label: 'Linear', category: 'Dev Tools', isDark: true, fonts: 'linear',
      v: {
        '--bg':'#0f0f10','--surface':'#141416','--surface2':'#1c1c1f',
        '--border':'#1e1e22','--border2':'#28282d',
        '--text':'#ededef','--text2':'#8a8a94','--text3':'#4a4a54',
        '--accent':'#8b5cf6','--accent-bg':'rgba(139,92,246,0.12)','--accent-text':'#a78bfa','--accent-fg':'#ffffff',
        '--accent-dim':'#5a3aa8',
        '--blue':'#5e9eff','--blue-bg':'rgba(94,158,255,0.10)',
        '--green':'#4ade80','--green-bg':'rgba(74,222,128,0.10)',
        '--red':'#f87171','--red-bg':'rgba(248,113,113,0.10)',
        '--steel':'#6a6a78',
        '--radius':'8px','--radius-sm':'6px','--radius-lg':'12px',
        '--blur':'0px','--shadow':'0 4px 24px rgba(0,0,0,0.3)'
      }
    },
    vercel: {
      label: 'Vercel', category: 'Dev Tools', isDark: true, fonts: 'vercel',
      v: {
        '--bg':'#000000','--surface':'#0a0a0a','--surface2':'#141414',
        '--border':'#1a1a1a','--border2':'#262626',
        '--text':'#ededed','--text2':'#888888','--text3':'#4a4a4a',
        '--accent':'#ffffff','--accent-bg':'rgba(255,255,255,0.06)','--accent-text':'#ffffff','--accent-fg':'#000000',
        '--accent-dim':'#666666',
        '--blue':'#0070f3','--blue-bg':'rgba(0,112,243,0.10)',
        '--green':'#0070f3','--green-bg':'rgba(0,112,243,0.10)',
        '--red':'#ee0000','--red-bg':'rgba(238,0,0,0.10)',
        '--steel':'#888888',
        '--radius':'6px','--radius-sm':'4px','--radius-lg':'10px',
        '--blur':'0px','--shadow':'0 4px 24px rgba(0,0,0,0.5)'
      }
    },
    stripe: {
      label: 'Stripe', category: 'Fintech', isDark: false, fonts: 'stripe',
      v: {
        '--bg':'#f6f9fc','--surface':'#ffffff','--surface2':'#f0f4f8',
        '--border':'#e3e8ef','--border2':'#cdd5df',
        '--text':'#0a2540','--text2':'#425466','--text3':'#8898aa',
        '--accent':'#635bff','--accent-bg':'rgba(99,91,255,0.08)','--accent-text':'#5851db','--accent-fg':'#ffffff',
        '--accent-dim':'#a8a4f5',
        '--blue':'#635bff','--blue-bg':'rgba(99,91,255,0.08)',
        '--green':'#00a878','--green-bg':'rgba(0,168,120,0.08)',
        '--red':'#e25950','--red-bg':'rgba(226,89,80,0.08)',
        '--steel':'#5a6c84',
        '--radius':'8px','--radius-sm':'6px','--radius-lg':'14px',
        '--blur':'0px','--shadow':'0 4px 12px rgba(20,40,80,0.06)'
      }
    },
    figma: {
      label: 'Figma', category: 'Design', isDark: true, fonts: 'figma',
      v: {
        '--bg':'#1e1e1e','--surface':'#2c2c2c','--surface2':'#383838',
        '--border':'#3a3a3a','--border2':'#4a4a4a',
        '--text':'#e5e5e5','--text2':'#aaaaaa','--text3':'#666666',
        '--accent':'#18a0fb','--accent-bg':'rgba(24,160,251,0.12)','--accent-text':'#18a0fb','--accent-fg':'#ffffff',
        '--accent-dim':'#0a5080',
        '--blue':'#18a0fb','--blue-bg':'rgba(24,160,251,0.10)',
        '--green':'#0fa958','--green-bg':'rgba(15,169,88,0.10)',
        '--red':'#f24822','--red-bg':'rgba(242,72,34,0.10)',
        '--steel':'#7a7a7a',
        '--radius':'2px','--radius-sm':'2px','--radius-lg':'4px',
        '--blur':'0px','--shadow':'0 2px 8px rgba(0,0,0,0.4)'
      }
    },
    github: {
      label: 'GitHub', category: 'Dev Tools', isDark: true, fonts: 'github',
      v: {
        '--bg':'#0d1117','--surface':'#161b22','--surface2':'#21262d',
        '--border':'#21262d','--border2':'#30363d',
        '--text':'#e6edf3','--text2':'#8b949e','--text3':'#484f58',
        '--accent':'#3fb950','--accent-bg':'rgba(63,185,80,0.12)','--accent-text':'#3fb950','--accent-fg':'#ffffff',
        '--accent-dim':'#1f5a28',
        '--blue':'#58a6ff','--blue-bg':'rgba(88,166,255,0.10)',
        '--green':'#3fb950','--green-bg':'rgba(63,185,80,0.10)',
        '--red':'#f85149','--red-bg':'rgba(248,81,73,0.10)',
        '--steel':'#6a7480',
        '--radius':'6px','--radius-sm':'4px','--radius-lg':'10px',
        '--blur':'0px','--shadow':'0 8px 24px rgba(0,0,0,0.4)'
      }
    },
    salesforce: {
      label: 'Salesforce', category: 'Enterprise', isDark: false, fonts: 'salesforce',
      v: {
        '--bg':'#f3f3f3','--surface':'#ffffff','--surface2':'#ecebea',
        '--border':'#dddbda','--border2':'#c9c7c5',
        '--text':'#181818','--text2':'#514f4d','--text3':'#9e9e9c',
        '--accent':'#0070d2','--accent-bg':'rgba(0,112,210,0.08)','--accent-text':'#0070d2','--accent-fg':'#ffffff',
        '--accent-dim':'#a8c4e0',
        '--blue':'#0070d2','--blue-bg':'rgba(0,112,210,0.08)',
        '--green':'#04844b','--green-bg':'rgba(4,132,75,0.08)',
        '--red':'#c23934','--red-bg':'rgba(194,57,52,0.08)',
        '--steel':'#6a7480',
        '--radius':'4px','--radius-sm':'3px','--radius-lg':'8px',
        '--blur':'0px','--shadow':'0 2px 4px rgba(0,0,0,0.10)'
      }
    },
    sap: {
      label: 'SAP Fiori', category: 'Enterprise', isDark: false, fonts: 'sap',
      v: {
        '--bg':'#f5f5f5','--surface':'#ffffff','--surface2':'#f0f0f0',
        '--border':'#d9d9d9','--border2':'#c4c4c4',
        '--text':'#1d2d3e','--text2':'#5a6872','--text3':'#a8b1b8',
        '--accent':'#df6e0c','--accent-bg':'rgba(223,110,12,0.08)','--accent-text':'#a84000','--accent-fg':'#ffffff',
        '--accent-dim':'#e8b078',
        '--blue':'#0a6ed1','--blue-bg':'rgba(10,110,209,0.08)',
        '--green':'#107e3e','--green-bg':'rgba(16,126,62,0.08)',
        '--red':'#bb0000','--red-bg':'rgba(187,0,0,0.08)',
        '--steel':'#6a7480',
        '--radius':'4px','--radius-sm':'3px','--radius-lg':'8px',
        '--blur':'0px','--shadow':'0 2px 8px rgba(0,0,0,0.08)'
      }
    }
  };

  /* ────── DEFAULT ────── */
  const DEFAULT_THEME = 'industrial_dark';

  /* ────── FONT LOADER ────── */
  const loadedFonts = new Set();
  function loadFonts(fontKey) {
    const cfg = FONTS[fontKey];
    if (!cfg || !cfg.gf || cfg.gf.length === 0) return;
    cfg.gf.forEach(family => {
      if (loadedFonts.has(family)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
      document.head.appendChild(link);
      loadedFonts.add(family);
    });
  }

  /* ────── APPLY THEME ────── */
  function applyTheme(name, customCfg) {
    const theme = THEMES[name] || THEMES[DEFAULT_THEME];
    const root = document.documentElement;

    /* CSS vars */
    Object.entries(theme.v).forEach(([k, val]) => root.style.setProperty(k, val));

    /* Fonts */
    const fontCfg = FONTS[theme.fonts];
    loadFonts(theme.fonts);
    root.style.setProperty('--font-display', fontCfg.display);
    root.style.setProperty('--font-body',    fontCfg.body);
    root.style.setProperty('--font-mono',    fontCfg.mono);

    /* Light/dark attribute for any CSS overrides */
    root.setAttribute('data-theme', theme.isDark ? 'dark' : 'light');
    root.setAttribute('data-theme-name', name);

    /* Custom overrides (bg image, blur, accent, opacity) */
    customCfg = customCfg || getCustomConfig();
    if (customCfg.accent) {
      root.style.setProperty('--accent', customCfg.accent);
      root.style.setProperty('--accent-text', customCfg.accent);
    }
    if (customCfg.bgImage) {
      root.style.setProperty('--bg-image', `url("${customCfg.bgImage}")`);
      const overlay = customCfg.bgOpacity != null ? customCfg.bgOpacity : 0.72;
      const baseRgb = theme.isDark ? '8,8,7' : '245,244,240';
      root.style.setProperty('--bg-overlay', `rgba(${baseRgb},${overlay})`);
      root.classList.add('has-bg-image');
    } else {
      root.style.setProperty('--bg-image', 'none');
      root.style.setProperty('--bg-overlay', 'transparent');
      root.classList.remove('has-bg-image');
    }
    if (customCfg.blur != null) {
      root.style.setProperty('--blur', `${customCfg.blur}px`);
    }

    /* Notify listeners (charts, etc.) that the theme changed */
    window.dispatchEvent(new CustomEvent('steeltheme:change', {
      detail: { name, theme, custom: customCfg }
    }));
  }

  /* ────── PERSISTENCE ────── */
  function getCurrentTheme() {
    return localStorage.getItem('sp_theme') || DEFAULT_THEME;
  }
  function setCurrentTheme(name) {
    localStorage.setItem('sp_theme', name);
  }
  function getCustomConfig() {
    try { return JSON.parse(localStorage.getItem('sp_theme_custom') || '{}'); }
    catch { return {}; }
  }
  function setCustomConfig(cfg) {
    localStorage.setItem('sp_theme_custom', JSON.stringify(cfg || {}));
  }

  /* ────── INIT (call on every page load) ────── */
  function initTheme() {
    applyTheme(getCurrentTheme(), getCustomConfig());
  }

  /* ────── BG IMAGE UPLOAD ────── */
  function uploadBgImage(file, callback) {
    if (!file) return;
    const MAX_SIZE = 3 * 1024 * 1024; // 3 MB practical limit for localStorage
    if (file.size > MAX_SIZE) {
      callback(null, 'Image is too large. Please pick one under 3 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => callback(e.target.result, null);
    reader.onerror = () => callback(null, 'Failed to read image.');
    reader.readAsDataURL(file);
  }

  /* ────── THEME PICKER UI ────── */
  function renderThemePicker(mountEl, onClose) {
    const current = getCurrentTheme();
    const custom = getCustomConfig();

    /* Group themes by category */
    const groups = {};
    Object.entries(THEMES).forEach(([key, t]) => {
      (groups[t.category] = groups[t.category] || []).push({ key, ...t });
    });
    const order = ['Industrial', 'Dev Tools', 'Productivity', 'Fintech', 'Design', 'Enterprise', 'Light', 'Glass'];

    const html = `
      <div class="tp-overlay" id="tpOverlay">
        <div class="tp-panel" id="tpPanel">
          <div class="tp-head">
            <div>
              <div class="tp-title">Appearance</div>
              <div class="tp-sub">Choose a preset or build your own</div>
            </div>
            <button class="tp-close" id="tpClose" aria-label="Close">×</button>
          </div>

          <div class="tp-tabs">
            <button class="tp-tab active" data-tab="presets">Presets</button>
            <button class="tp-tab" data-tab="custom">Custom</button>
          </div>

          <div class="tp-body">
            <div class="tp-pane" data-pane="presets">
              ${order.filter(c => groups[c]).map(cat => `
                <div class="tp-group-label">${cat}</div>
                <div class="tp-grid">
                  ${groups[cat].map(t => `
                    <button class="tp-card ${t.key === current ? 'active' : ''}" data-theme="${t.key}">
                      <div class="tp-swatch" style="background:${t.v['--bg']}">
                        <div class="tp-swatch-sb" style="background:${t.v['--surface']};border-color:${t.v['--border2']}"></div>
                        <div class="tp-swatch-acc" style="background:${t.v['--accent']}"></div>
                        <div class="tp-swatch-text" style="color:${t.v['--text']};font-family:${FONTS[t.fonts].display}">Aa</div>
                      </div>
                      <div class="tp-card-name">${t.label}</div>
                    </button>
                  `).join('')}
                </div>
              `).join('')}
            </div>

            <div class="tp-pane hidden" data-pane="custom">
              <label class="tp-lbl">Base preset</label>
              <select class="tp-input" id="tpBase">
                ${Object.entries(THEMES).map(([k, t]) =>
                  `<option value="${k}" ${k === (custom.base || current) ? 'selected' : ''}>${t.label}</option>`
                ).join('')}
              </select>

              <label class="tp-lbl">Accent color</label>
              <div class="tp-color-row">
                <input class="tp-color" type="color" id="tpAccent" value="${custom.accent || '#e8a020'}">
                <input class="tp-input tp-color-text" id="tpAccentText" value="${custom.accent || '#e8a020'}">
              </div>

              <label class="tp-lbl">Background image</label>
              <div class="tp-bg-row">
                <input class="tp-input" id="tpBgUrl" placeholder="Paste image URL or upload below" value="${custom.bgImage && !custom.bgImage.startsWith('data:') ? custom.bgImage : ''}">
                <label class="tp-btn-sec" for="tpBgFile">Upload</label>
                <input type="file" accept="image/*" id="tpBgFile" style="display:none">
              </div>
              ${custom.bgImage ? `<div class="tp-bg-preview" style="background-image:url('${custom.bgImage.substring(0,100)}${custom.bgImage.length>100?'...':''}')">
                <button class="tp-bg-clear" id="tpBgClear">Remove</button>
              </div>` : '<div class="tp-bg-preview empty">No image</div>'}
              <div class="tp-msg" id="tpBgMsg"></div>

              <label class="tp-lbl">Background overlay opacity <span class="tp-val" id="tpOpacityVal">${Math.round((custom.bgOpacity != null ? custom.bgOpacity : 0.72) * 100)}%</span></label>
              <input type="range" class="tp-range" id="tpOpacity" min="0" max="100" value="${Math.round((custom.bgOpacity != null ? custom.bgOpacity : 0.72) * 100)}">

              <label class="tp-lbl">Background blur <span class="tp-val" id="tpBlurVal">${custom.blur || 0}px</span></label>
              <input type="range" class="tp-range" id="tpBlur" min="0" max="40" value="${custom.blur || 0}">

              <div class="tp-actions">
                <button class="tp-btn-sec" id="tpReset">Reset</button>
                <button class="tp-btn-pri" id="tpApplyCustom">Apply Custom</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    mountEl.insertAdjacentHTML('beforeend', html);
    const overlay = document.getElementById('tpOverlay');

    /* Close handlers */
    function close() {
      overlay.remove();
      if (onClose) onClose();
    }
    document.getElementById('tpClose').onclick = close;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    /* Tabs */
    overlay.querySelectorAll('.tp-tab').forEach(tab => {
      tab.onclick = () => {
        overlay.querySelectorAll('.tp-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        overlay.querySelectorAll('.tp-pane').forEach(p => p.classList.toggle('hidden', p.dataset.pane !== tab.dataset.tab));
      };
    });

    /* Preset clicks */
    overlay.querySelectorAll('.tp-card').forEach(card => {
      card.onclick = () => {
        const name = card.dataset.theme;
        setCurrentTheme(name);
        /* preserve bg image but drop accent override on preset switch */
        const c = getCustomConfig();
        const newCfg = { bgImage: c.bgImage, bgOpacity: c.bgOpacity, blur: c.blur };
        setCustomConfig(newCfg);
        applyTheme(name, newCfg);
        overlay.querySelectorAll('.tp-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      };
    });

    /* Custom pane wiring */
    const accentInput  = document.getElementById('tpAccent');
    const accentText   = document.getElementById('tpAccentText');
    const bgUrl        = document.getElementById('tpBgUrl');
    const bgFile       = document.getElementById('tpBgFile');
    const opacityInput = document.getElementById('tpOpacity');
    const blurInput    = document.getElementById('tpBlur');
    const opacityVal   = document.getElementById('tpOpacityVal');
    const blurVal      = document.getElementById('tpBlurVal');
    const bgMsg        = document.getElementById('tpBgMsg');

    accentInput.oninput = () => { accentText.value = accentInput.value; };
    accentText.oninput  = () => { if (/^#[0-9a-f]{6}$/i.test(accentText.value)) accentInput.value = accentText.value; };
    opacityInput.oninput = () => { opacityVal.textContent = opacityInput.value + '%'; };
    blurInput.oninput    = () => { blurVal.textContent    = blurInput.value + 'px'; };

    let pendingBgImage = custom.bgImage || '';
    bgFile.onchange = e => {
      const file = e.target.files[0];
      uploadBgImage(file, (dataUrl, err) => {
        if (err) { bgMsg.textContent = err; bgMsg.className = 'tp-msg err'; return; }
        pendingBgImage = dataUrl;
        bgMsg.textContent = '✓ Image loaded — click Apply Custom to save';
        bgMsg.className = 'tp-msg ok';
      });
    };
    bgUrl.oninput = () => { pendingBgImage = bgUrl.value.trim(); };

    const clearBtn = document.getElementById('tpBgClear');
    if (clearBtn) clearBtn.onclick = () => {
      pendingBgImage = '';
      bgUrl.value = '';
      bgMsg.textContent = 'Image removed — click Apply Custom to save';
      bgMsg.className = 'tp-msg ok';
    };

    document.getElementById('tpReset').onclick = () => {
      setCustomConfig({});
      applyTheme(getCurrentTheme(), {});
      close();
      renderThemePicker(mountEl, onClose);
    };

    document.getElementById('tpApplyCustom').onclick = () => {
      const base = document.getElementById('tpBase').value;
      const cfg = {
        base,
        accent: accentText.value,
        bgImage: pendingBgImage || '',
        bgOpacity: parseInt(opacityInput.value, 10) / 100,
        blur: parseInt(blurInput.value, 10)
      };
      setCustomConfig(cfg);
      setCurrentTheme(base);
      applyTheme(base, cfg);
      close();
    };
  }

  /* ────── PICKER STYLES (inject once) ────── */
  function injectPickerStyles() {
    if (document.getElementById('tp-styles')) return;
    const style = document.createElement('style');
    style.id = 'tp-styles';
    style.textContent = `
.tp-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;animation:tpFadeIn .15s ease}
.tp-panel{background:var(--surface);border:1px solid var(--border2);border-radius:var(--radius-lg);width:100%;max-width:680px;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,0.5);animation:tpSlideIn .2s ease}
.tp-head{display:flex;align-items:flex-start;justify-content:space-between;padding:20px 24px 16px;border-bottom:1px solid var(--border)}
.tp-title{font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--text);letter-spacing:-0.2px}
.tp-sub{font-size:12px;color:var(--text3);margin-top:2px}
.tp-close{background:transparent;border:none;color:var(--text2);font-size:24px;cursor:pointer;width:32px;height:32px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;line-height:1}
.tp-close:hover{background:var(--surface2);color:var(--text)}
.tp-tabs{display:flex;gap:4px;padding:12px 24px 0;border-bottom:1px solid var(--border)}
.tp-tab{background:transparent;border:none;padding:8px 16px;font-family:var(--font-body);font-size:13px;font-weight:500;color:var(--text2);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
.tp-tab.active{color:var(--accent-text);border-bottom-color:var(--accent)}
.tp-body{padding:20px 24px;overflow-y:auto;flex:1}
.tp-pane.hidden{display:none}
.tp-group-label{font-family:var(--font-mono);font-size:10px;font-weight:600;color:var(--text3);letter-spacing:0.8px;text-transform:uppercase;margin:14px 0 10px}
.tp-group-label:first-child{margin-top:0}
.tp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}
.tp-card{background:transparent;border:1px solid var(--border2);border-radius:var(--radius-sm);padding:8px;cursor:pointer;transition:border-color .12s,transform .12s;text-align:left}
.tp-card:hover{border-color:var(--accent);transform:translateY(-1px)}
.tp-card.active{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent-bg)}
.tp-swatch{height:60px;border-radius:calc(var(--radius-sm) - 2px);position:relative;overflow:hidden;border:1px solid var(--border)}
.tp-swatch-sb{position:absolute;left:0;top:0;bottom:0;width:30%;border-right:1px solid}
.tp-swatch-acc{position:absolute;right:8px;top:8px;width:14px;height:14px;border-radius:50%}
.tp-swatch-text{position:absolute;left:50%;top:50%;transform:translate(-25%,-50%);font-size:18px;font-weight:700}
.tp-card-name{font-family:var(--font-body);font-size:11px;font-weight:600;color:var(--text);margin-top:6px;padding:0 2px}
.tp-lbl{display:flex;justify-content:space-between;align-items:center;font-family:var(--font-mono);font-size:10px;font-weight:600;color:var(--text3);letter-spacing:0.6px;text-transform:uppercase;margin:14px 0 6px}
.tp-lbl:first-child{margin-top:0}
.tp-val{font-family:var(--font-mono);color:var(--accent);text-transform:none;letter-spacing:0}
.tp-input,.tp-color-text{width:100%;height:38px;padding:0 12px;border:1px solid var(--border2);border-radius:var(--radius-sm);background:var(--surface);color:var(--text);font-family:var(--font-body);font-size:13px;outline:none;transition:border-color .12s}
.tp-input:focus,.tp-color-text:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-bg)}
.tp-color-row{display:flex;gap:8px;align-items:center}
.tp-color{width:42px;height:38px;padding:2px;border:1px solid var(--border2);border-radius:var(--radius-sm);background:var(--surface);cursor:pointer}
.tp-color-text{flex:1;font-family:var(--font-mono)}
.tp-bg-row{display:flex;gap:8px;align-items:center}
.tp-bg-row .tp-input{flex:1}
.tp-bg-preview{margin-top:8px;height:80px;border:1px dashed var(--border2);border-radius:var(--radius-sm);background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;position:relative}
.tp-bg-preview.empty{color:var(--text3);font-size:12px;font-family:var(--font-mono)}
.tp-bg-clear{position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.7);color:#fff;border:none;border-radius:var(--radius-sm);padding:4px 10px;font-size:11px;cursor:pointer}
.tp-msg{font-size:11px;font-family:var(--font-mono);margin-top:6px;min-height:14px}
.tp-msg.ok{color:var(--green)}
.tp-msg.err{color:var(--red)}
.tp-range{width:100%;-webkit-appearance:none;background:transparent;height:24px;cursor:pointer}
.tp-range::-webkit-slider-runnable-track{height:4px;background:var(--border2);border-radius:2px}
.tp-range::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent);margin-top:-6px;cursor:pointer;border:2px solid var(--surface);box-shadow:0 0 0 1px var(--accent)}
.tp-range::-moz-range-track{height:4px;background:var(--border2);border-radius:2px}
.tp-range::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:var(--accent);cursor:pointer;border:2px solid var(--surface)}
.tp-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)}
.tp-btn-sec{background:transparent;border:1px solid var(--border2);color:var(--text2);padding:8px 16px;border-radius:var(--radius-sm);font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;transition:all .12s}
.tp-btn-sec:hover{border-color:var(--accent);color:var(--text)}
.tp-btn-pri{background:var(--accent);color:var(--accent-fg);border:none;padding:8px 18px;border-radius:var(--radius-sm);font-family:var(--font-body);font-size:13px;font-weight:700;cursor:pointer;transition:opacity .12s}
.tp-btn-pri:hover{opacity:0.9}
@keyframes tpFadeIn{from{opacity:0}to{opacity:1}}
@keyframes tpSlideIn{from{transform:translateY(8px);opacity:0}to{transform:translateY(0);opacity:1}}
@media (max-width:600px){.tp-grid{grid-template-columns:repeat(auto-fill,minmax(110px,1fr))}.tp-panel{max-height:95vh}}
    `;
    document.head.appendChild(style);
  }

  /* ────── BG IMAGE LAYER (auto-injected on every page using SteelTheme) ────── */
  function injectBgLayer() {
    if (document.getElementById('sp-bg-layer')) return;
    const style = document.createElement('style');
    style.id = 'sp-bg-layer-styles';
    style.textContent = `
html.has-bg-image body::before{content:"";position:fixed;inset:0;background-image:var(--bg-image);background-size:cover;background-position:center;z-index:-2;pointer-events:none}
html.has-bg-image body::after{content:"";position:fixed;inset:0;background:var(--bg-overlay);backdrop-filter:blur(var(--blur));z-index:-1;pointer-events:none}
    `;
    document.head.appendChild(style);
  }

  /* ────── PUBLIC API ────── */
  global.SteelTheme = {
    THEMES,
    FONTS,
    apply: applyTheme,
    init: function () {
      injectBgLayer();
      injectPickerStyles();
      initTheme();
    },
    getCurrent: getCurrentTheme,
    setCurrent: setCurrentTheme,
    getCustom: getCustomConfig,
    setCustom: setCustomConfig,
    openPicker: function (mountEl, onClose) {
      injectPickerStyles();
      renderThemePicker(mountEl || document.body, onClose);
    }
  };

  /* Auto-init on script load */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => global.SteelTheme.init());
  } else {
    global.SteelTheme.init();
  }
})(window);
