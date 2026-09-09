const CACHE='ai-compass-hub-v2-1.1.0';
const SOURCES=['00_FRONT_PART0_PART1.md','01_PART2_PART3.md','02_PART4.md','03_PART5_PART6.md','04_PART7.md','05_APPENDICES.md'];
const FILES=['./','./index.html','./styles.css','./app.js','./router.js','./storage.js','./manuscript.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png',...['hub','ebook','teacher-deck','cases'].map(n=>'./data/'+n+'.json'),'../../docs/education/glossary/AI_COMPASS_GLOSSARY_DATA_v1.0.json',...SOURCES.map(n=>'../../docs/manuscript/'+n)];
FILES.push(...Array.from({length:42},(_,i)=>'./assets/lecture-v01/slide-'+String(i+1).padStart(2,'0')+'.webp'));
const URLS=FILES.map(p=>new URL(p,self.location).href);
self.addEventListener('install',ev=>ev.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS))));
self.addEventListener('activate',ev=>ev.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>/^ai-compass-hub-v2-/.test(k)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',ev=>{if(ev.request.method!=='GET'||!URLS.includes(ev.request.url))return;ev.respondWith(caches.open(CACHE).then(async c=>(await c.match(ev.request))||fetch(ev.request)));});
