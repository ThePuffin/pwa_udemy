const staticCache = "static-cache";
const dynamicCache = "dynamic-cache";
const assets = [
  "/",
  "/index.html",
  "/pages/fallback.html",
  "/js/ui.js",
  "/js/app.js",
  "/js/users.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css",
  "/manif.json",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

const limitNumCache = (cacheName, num) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > num) {
        cache.delete(keys[0]).then(limitNumCache(cacheName, num));
      }
    });
  });
};

//install process
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCache).then((cache) => {
      cache.addAll(assets);
    })
  );
});

//activate process
self.addEventListener("activate", (e) => {
  console.log("sw is activated");
});

//network first
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((cache) => {
        cache.put(e.request.url, fetchRes.clone());
        return fetchRes;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});

//fetch events
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((staticRes) => {
        return (
          staticRes ||
          fetch(e.request).then((dynamicRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(e.request.url, dynamicRes.clone());
              return dynamicRes;
            });
          })
        );
      })
      .catch(() => caches.match("/pages/fallback.html"))
  );
});

//cache only
// self.addEventListener("fetch", (e) => {
//   e.respondWith(caches.match(e.request));
// });
