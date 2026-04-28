const CACHE_NAME = 'cebim-v1';
const APP_SHELL = [
  './mifin.html',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js',
  'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  // Don't cache API calls
  if (event.request.url.includes('firebaseio.com') ||
      event.request.url.includes('api.anthropic.com') ||
      event.request.url.includes('api.openai.com') ||
      event.request.url.includes('generativelanguage.googleapis.com') ||
      event.request.url.includes('api.groq.com') ||
      event.request.url.includes('api.deepseek.com') ||
      event.request.url.includes('openrouter.ai') ||
      event.request.url.includes('api.mistral.ai') ||
      event.request.url.includes('api.cohere.ai') ||
      event.request.url.includes('api.together.xyz') ||
      event.request.url.includes('exchangerate-api.com')) {
    return fetch(event.request);
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
