const CACHE = 'emergency-guide-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './Images/CPR.png',
  './Images/Heart Attack.png',
  './Images/Stroke.png',
  './Images/Choking.png',
  './Images/Severe Bleeding.png',
  './Images/Burns.png',
  './Images/Broken Bones.png',
  './Images/Allergic Reaction.png',
  './Images/Poisoning.png',
  './Images/Head Injury.png',
  './Images/Shock.png',
  './Images/Drowning.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => cached);
    })
  );
});
