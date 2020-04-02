const PRE_CACHE_NAME = 'static-v2'
const DYNAMIC_CACHE_NAME = 'dynamic-v2'
const STATIC_FILES = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/img/sprite.svg',
  '/img/hero-1-large.jpg',
  '/img/hero-2-small.jpg',
  '/img/my-avatar-200w.jpg',
  '/img/my-avatar-400w.jpg',
  '/file/agile-developers-certificate.jpg',
  '/img/logo.png',
  '/img/logo-2x.png',
  '/img/logo-3x.png',
  '/file/my-cv.pdf'
]

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing...')

  event.waitUntil(
    caches.open(PRE_CACHE_NAME).then(function(cache) {
      cache.addAll(STATIC_FILES)
    })
  )
})

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating...')

  event.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(keys.map(function(key) {
          if (![PRE_CACHE_NAME, DYNAMIC_CACHE_NAME].includes(key)) {
            return caches.delete(key)
          }
        }))
      })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) return res

      return fetch(event.request).then(function(res) {
        return caches.open(DYNAMIC_CACHE_NAME).then(function(cache) {
          cache.put(event.request, res.clone())

          return res
        })
      })
    })
  )
})