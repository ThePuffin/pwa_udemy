const staticCache = "static-cache";
const dynamicCache = "dynamic-cache";
const assets = [
  "/",
  "/index.html",
  "/js/ui.js",
  "/js/app.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css",
  "/manif.json",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

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
  e.respondWith(
    caches.match(e.request).then((staticRes) => {
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
  );
});
