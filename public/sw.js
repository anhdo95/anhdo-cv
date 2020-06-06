importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

self.__WB_DISABLE_DEV_LOGS = true

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1590936675913" },
  { url: "/index.html", revision: "1590936683721" },
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
)

workbox.routing.registerRoute(
  ({request}) => request.destination === 'manifest',
  new workbox.strategies.CacheFirst({
    cacheName: 'app-manifest',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ]
  })
)

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
  ({request}) => request.destination === 'style',
  new workbox.strategies.CacheFirst({
    cacheName: 'app-styles',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
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
