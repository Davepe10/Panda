const CACHE='pandalandia-v64-shell'
const CORE=['/icons/icon-192.png','/icons/icon-512.png','/models/pets/cocker.glb']
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))})
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('pandalandia-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))})
self.addEventListener('fetch',event=>{
 const req=event.request
 if(req.method!=='GET')return
 const url=new URL(req.url)
 if(url.origin!==self.location.origin)return
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res}).catch(()=>caches.match(req).then(r=>r||caches.match('/app'))))
  return
 }
 const asset=/\.(?:js|css|png|jpg|jpeg|webp|svg|woff2?|glb|gltf|bin)$/i.test(url.pathname)
 if(asset)event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res})))
})
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const client of list){if('focus'in client)return client.focus()}return clients.openWindow('/app')}))})
