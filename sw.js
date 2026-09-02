/**
 * @file sw.js
 * @description Service Worker de alto rendimiento para PWA (Progressive Web App).
 * Estrategia: Network-First para código/HTML (siempre lo más reciente) y Cache-First para multimedia pesada.
 */

const CACHE_VERSION = 'lady-loayza-tech-v2.1.0';
const STATIC_CACHE_NAME = `static-${CACHE_VERSION}`;
const MEDIA_CACHE_NAME = `media-${CACHE_VERSION}`;

const CORE_ASSETS = [
  './',
  './index.html',
  './assets/css/main.css',
  './assets/css/variables.css',
  './assets/css/layout.css',
  './assets/css/hero.css',
  './assets/css/components.css',
  './manifest.json',
  './src/main.js'
];

// 1. Instalación: Pre-cacheados de recursos base y activación inmediata
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Fallo parcial en pre-cacheo:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activación: Limpieza automática de versiones antiguas de caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE_NAME && key !== MEDIA_CACHE_NAME) {
            console.info('[ServiceWorker] Eliminando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: Network-First para Scripts/Estilos/HTML y Cache-First para Imágenes
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // No interceptar peticiones no-GET ni APIs externas (GitHub, LinkedIn)
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // A. Imágenes Estáticas Locales: Cache-First con fallback a red
  if (url.pathname.includes('/assets/images/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(MEDIA_CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // B. Documento HTML, Módulos JS y CSS: Network-First (Garantiza siempre la última versión)
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(STATIC_CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback a caché si el usuario está offline
        return caches.match(request);
      })
  );
});
