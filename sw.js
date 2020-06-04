importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

self.__WB_DISABLE_DEV_LOGS = true

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1590936675913" },
  { url: "/index.html", revision: "1590936683721" },
  { url: "/css/style.css", revision: "1590936686729" },
  { url: "/img/sprite.svg", revision: "312890312921" },
  { url: "/img/logo.png", revision: "312890312922" },
  { url: "/img/logo-2x.png", revision: "312890312923" },
  { url: "/img/logo-3x.png", revision: "312890312924" },
  { url: "/img/hero-1-large.jpg", revision: "312890312925" },
  { url: "/img/hero-2-small.jpg", revision: "312890312926" },
  { url: "/img/my-avatar-200w.jpg", revision: "312890312927" },
  { url: "/img/my-avatar-400w.jpg", revision: "312890312928" },
  { url: "/file/agile-developers-certificate.jpg", revision: "312890312929" },
  { url: "/file/my-cv.pdf", revision: "3128903111111" },
])

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-styles',
  })
)

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        maxEntries: 15,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'app-images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      })
    ]
  })
)

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script',
  new workbox.strategies.CacheFirst({
    cacheName: 'app-scripts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 4 * 60 * 60,
      })
    ]
  })
)

// const PRE_CACHE_NAME = 'static-v2'
// const DYNAMIC_CACHE_NAME = 'dynamic-v2'
// const STATIC_FILES = [
//   // '/',
//   // '/index.html',
//   '/css/style.css',
//   // '/js/app.js',
//   '/img/sprite.svg',
//   '/img/hero-1-large.jpg',
//   '/img/hero-2-small.jpg',
//   '/img/my-avatar-200w.jpg',
//   '/img/my-avatar-400w.jpg',
//   '/file/agile-developers-certificate.jpg',
//   '/img/logo.png',
//   '/img/logo-2x.png',
//   '/img/logo-3x.png',
//   // '/file/my-cv.pdf'
// ]

// self.addEventListener('install', function(event) {
//   console.log('[Service Worker] Installing...')

//   event.waitUntil(
//     caches.open(PRE_CACHE_NAME).then(function(cache) {
//       cache.addAll(STATIC_FILES)
//     })
//   )
// })

// self.addEventListener('activate', function(event) {
//   console.log('[Service Worker] Activating...')

//   event.waitUntil(
//     caches.keys()
//       .then(function(keys) {
//         return Promise.all(keys.map(function(key) {
//           if (![PRE_CACHE_NAME, DYNAMIC_CACHE_NAME].includes(key)) {
//             return caches.delete(key)
//           }
//         }))
//       })
//   )
// })

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(res) {
//       if (res) return res

//       return fetch(event.request).then(function(res) {
//         return caches.open(DYNAMIC_CACHE_NAME).then(function(cache) {
//           cache.put(event.request, res.clone())

//           return res
//         })
//       })
//     })
//   )
// })