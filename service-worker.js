const CACHE_NAME = "abo-cache-v3";

const archivos = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icono.png"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(archivos))
  );
});

self.addEventListener("fetch", (evento) => {
  evento.respondWith(
    caches.match(evento.request)
      .then((respuesta) => respuesta || fetch(evento.request))
  );
});