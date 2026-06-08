const CACHE_NAME = 'peluqueria-v1'
const STATIC_ASSETS = ['/', '/login']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only cache same-origin GET requests and supabase REST GETs
  if (request.method !== 'GET') return

  const isNextStatic = url.pathname.startsWith('/_next/static')
  const isImage = /\.(png|jpg|jpeg|svg|ico|webp)$/.test(url.pathname)
  const isSupabaseRest =
    url.hostname.includes('supabase.co') && url.pathname.startsWith('/rest')

  if (isNextStatic || isImage) {
    // Cache first for static assets
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((res) => {
        const clone = res.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        return res
      })),
    )
    return
  }

  if (isSupabaseRest) {
    // Network first for data, fallback to cache
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return res
        })
        .catch(() => caches.match(request)),
    )
    return
  }

  // Network first for HTML pages
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request)),
    )
  }
})
