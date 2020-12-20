const staticCache = "static-cache";
const dynamicCache = "dynamic-cache";
const assets = [
  "/",
  "/index.html",
  "/pages/fallback.html",
  "/js/ui.js",
  "/js/app.js",
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

//fecth events
self.addEventListener("fetch", (e) => {
  if (e.request.url.indexOf("firestore.googleapis.com") === -1) {
    e.respondWith(
      caches
        .match(e.request)
        .then((staticRes) => {
          return (
            staticRes ||
            fetch(e.request).then((dynamicRes) => {
              return caches.open(dynamicCache).then((cache) => {
                cache.put(e.request.url, dynamicRes.clone());
                limitNumCache(dynamicCache, 2);
                return dynamicRes;
              });
            })
          );
        })
        .catch(() => caches.match("/pages/fallback.html"))
    );
  }
});
