self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open("static").then(function (cache) {
      console.log("{Service worker} Precaching App shell");
      // cache.add("/index.html");
      cache.add("/src/js/app.js");
    })
  ); // install event will not be completed when caches.open is not completed due to waitUntil
});

//The install events in service workers use waitUntil() to hold the service worker in the installing phase until tasks complete.

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  return self.clients.claim();
});

//The Cache interface provides a storage mechanism for Request / Response object pairs that are cached, for example as part of the ServiceWorker life cycle.

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request); //network request
      }
    })
  );
});
