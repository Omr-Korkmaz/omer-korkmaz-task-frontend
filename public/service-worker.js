const CACHE_VIEW = "my-cache";
const urlsToCache = ['/', '/index.html', '/beer',  '/offline', '/manifest.json'];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VIEW).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
