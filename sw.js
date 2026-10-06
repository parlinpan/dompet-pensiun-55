/* Dompet Pensiun 55 — service worker: aplikasi tetap jalan offline */
const VERSION = 'dp55-v1.2.0';
const SHELL = ['./', './index.html', './manifest.webmanifest', './seed.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== 'dp55-fonts' && k !== 'dp55-ocr' && k.startsWith('dp55-')).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Halaman: coba jaringan dulu (agar update cepat), jatuh ke cache saat offline
  if (req.mode === 'navigate'){
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Font Google: simpan setelah dipakai sekali
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    e.respondWith(caches.open('dp55-fonts').then(c => c.match(req).then(hit => hit || fetch(req).then(res => { c.put(req, res.clone()); return res; }))));
    return;
  }
  // Pembaca teks struk (Tesseract.js dari jsDelivr): simpan setelah unduhan pertama agar bisa offline
  if (url.hostname === 'cdn.jsdelivr.net'){
    e.respondWith(caches.open('dp55-ocr').then(c => c.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  // Aset aplikasi: cache dulu
  if (url.origin === location.origin){
    e.respondWith(caches.match(req, {ignoreSearch:true}).then(hit => hit || fetch(req)));
  }
});
