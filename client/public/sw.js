// Service Worker Configuration
const CACHE_NAME = 'digicom-cache-v1';
const API_DOMAIN = 'api.99digicom.com';

// Handle fetch events
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Pass through API requests without interference
  if (url.hostname === API_DOMAIN) {
    event.respondWith(
      fetch(event.request.clone())
        .catch(error => {
          console.error('API request failed:', error);
          return new Response(JSON.stringify({ error: 'Network request failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // Handle non-API requests with cache
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request because it can only be used once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it can only be used once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Clear old caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 