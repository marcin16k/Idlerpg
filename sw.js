// sw.js – Service Worker dla Idle RPG

const CACHE_NAME = "idle-rpg-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/js/game.js",
  "/js/save.js",
  "/js/ui.js",
  "/manifest.json",
  "/graphics/monster1.png",
  "/graphics/monster2.png",
  "/graphics/monster3.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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
