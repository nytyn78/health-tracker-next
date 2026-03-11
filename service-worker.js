const CACHE_NAME = "health-tracker-v1"

const urlsToCache = [
 "/",
 "/index.html",
 "/style.css",
 "/app.js",
 "/analytics.js",
 "/state.js",
 "/ui.js"
]

self.addEventListener("install", event=>{
 event.waitUntil(
  caches.open(CACHE_NAME)
   .then(cache=>cache.addAll(urlsToCache))
 )
})

self.addEventListener("fetch", event=>{
 event.respondWith(
  caches.match(event.request)
   .then(res=>res || fetch(event.request))
 )
})
