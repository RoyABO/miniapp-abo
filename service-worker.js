const CACHE_NAME = "abo-cache-v6";

const archivos = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icono.png"
];

self.addEventListener("install", (evento) => {
  self.skipWaiting();

  evento.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(archivos))
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nombres) => {
      return Promise.all(
        nombres.map((nombre) => {
          if (nombre !== CACHE_NAME) {
            return caches.delete(nombre);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  evento.respondWith(
    fetch(evento.request)
      .catch(() => caches.match(evento.request))
  );
});