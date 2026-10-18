const CACHE="heidlandtools-nfc-v2";
const FILES=["./","./index.html","./manifest.webmanifest"];
self.addEventListener("install",event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)))});
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Sofort aus dem Cache (schnell, auch offline), im Hintergrund aktualisieren: Änderungen sind beim nächsten Öffnen da.
self.addEventListener("fetch",event=>{
 const req=event.request;
 if(req.method!=="GET"||new URL(req.url).origin!==location.origin)return;
 const key=req.mode==="navigate"?"./index.html":req;
 event.respondWith(caches.match(key,{ignoreSearch:true}).then(cached=>{
  const net=fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(key,copy))}return res}).catch(()=>cached);
  return cached||net;
 }));
});
