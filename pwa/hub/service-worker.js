const CACHE='ai-compass-hub-v2-3';
const assets=['./','./index.html','./app.js','./router.js','./storage.js','./styles.css','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./hero-compass.png','./data/hub.json','./data/ebook.json','./data/teacher-deck.json','./data/cases.json','../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json','../glossary/','../glossary/index.html','../glossary/styles.css','../glossary/app.js','../glossary/storage.js','../glossary/service-worker.js','../glossary/manifest.webmanifest','../glossary/icon.svg','../glossary/icon-192.png','../glossary/icon-512.png'];
const urls=assets.map(p=>new URL(p,self.location).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(urls)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ai-compass-hub-v2-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);url.search='';
  if(!urls.includes(url.href))return;
  event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(url.href))||fetch(event.request)));
});
