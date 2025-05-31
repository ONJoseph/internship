const CACHE_NAME = "bmi-calculator-v1";
const urlsToCache = [
  "/",               // root page
  "/index.html",     // HTML page
  "/dist/main.js",   // JS bundle, adjust path if different
  "/manifest.json",  // manifest file
  "/icon-192.png",   // icons, must be accessible at these URLs
  "/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Use Promise.allSettled to avoid failing install if some resources 404
        return Promise.allSettled(
          urlsToCache.map(url => cache.add(url))
        );
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
