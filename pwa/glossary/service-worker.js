const CACHE = 'ai-compass-glossary-v1-2';
const SHELL = ['./', './index.html', './styles.css', './app.js', './storage.js', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', '../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json'];
const URLS = SHELL.map(path => new URL(path, self.location).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(URLS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('ai-compass-glossary-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!URLS.includes(url.href) && !(event.request.mode === 'navigate' && url.pathname.startsWith(new URL('./', self.location).pathname))) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(event.request, {ignoreSearch: true});
    if (hit) return hit;
    try { return await fetch(event.request); }
    catch (error) {
      if (event.request.mode === 'navigate') return cache.match(new URL('./index.html', self.location).href);
      throw error;
    }
  }));
});
