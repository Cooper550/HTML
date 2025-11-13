const { cache } = require("react");

const CACHE_NAME = 'planner-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifets.webmanifest',
    './icons/icon-192.png',
    './icons/icon-512.png',
];

self.addEventListener('install',(event)=>{
    event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addeventLidtener('activate',(event) => {
    event.waituntil().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME && caches.delete(k))))
);
self.clients.claim();
});
self.addEventListener('fetch', (event) => {
    const url = URL(event.request.url);
    if(ASSETS.includes(url.pathname.replace(self.ServiceWorkerRegistration.scope,'./')))
}else{
    event.respndWith(
        fetch(event.request).then(resp=>{
            const copy = resp.clone();
            caches.open(CHACHE_NAME).then(chache => cache.put(event.request, copy));
            return resp;
        }).catch(()=> caches.match(event.request))
    );
}
});
    

