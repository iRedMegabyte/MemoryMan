const V='memoryman-v1',A=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.open(V).then(async c=>{const r=await c.match(e.request,{ignoreSearch:true});
  const n=fetch(e.request).then(x=>{if(x.ok)c.put(e.request,x.clone());return x}).catch(()=>r||c.match('./index.html'));return r||n}))});
