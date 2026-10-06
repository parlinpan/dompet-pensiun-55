# Dompet Pensiun 55

Aplikasi keuangan pribadi (PWA) untuk mencatat arus kas harian, merencanakan tabungan per rekening bank, dan memproyeksikan dana pensiun sampai usia 55.

**Buka:** https://parlinpan.github.io/dompet-pensiun-55/

## Pasang sebagai aplikasi
- **iPhone/iPad (Safari):** Bagikan → Tambah ke Layar Utama
- **Android (Chrome):** menu ⋮ → Instal aplikasi
- **macOS (Safari 17+):** File → Tambahkan ke Dock · **Chrome/Edge:** ikon Instal di kolom alamat

## Data & privasi
Semua data tersimpan di perangkat (localStorage), tidak dikirim ke server. Gunakan **Profil → Buat backup** untuk menyimpan file `.json` dan **Pulihkan dari backup** untuk memindahkan data ke perangkat lain.

## Isi
- `index.html` — seluruh aplikasi (HTML/CSS/JS tanpa dependensi)
- `sw.js` — service worker untuk mode offline
- `manifest.webmanifest`, `icons/` — metadata instalasi
- `seed.json` — data contoh (opsional)

Alat bantu perencanaan, bukan nasihat keuangan berlisensi.
