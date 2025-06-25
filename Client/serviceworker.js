const cacheName = 'filexfer-cache-v1';
const staticAssets = [
  './',
  './index.html',
  './styles/main.css',
  './scripts/main.js',
  './scripts/ui.js',
  './scripts/utils.js',
  './scripts/webrtc.js',
  './scripts/signaling.js',
  './qrcode.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(staticAssets))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});