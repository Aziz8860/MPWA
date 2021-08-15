importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox) {
  console.log( `Workbox berhasil di load`);
} else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
  {url: '/', revision:'1'},
  {url: '/nav.html', revision:'1'},
  {url: '/index.html', revision:'1'},
  {url: '/icon.png', revision:'1'},
  {url: '/manifest.json', revision:'1'},
  {url: '/pages/klasemen.html', revision:'1'},
  {url: '/pages/tim.html', revision:'1'},
  {url: '/pages/favorit.html', revision:'1'},
  {url: '/pages/tentang.html', revision:'1'},
  {url: '/css/materialize.min.css', revision:'1'},
  {url: '/js/materialize.min.js', revision:'1'},
  {url: '/js/nav.js', revision:'1'},
  {url: '/js/api.js', revision:'1'},
  {url: '/js/idb.js', revision:'1'},
  {url: '/js/req.js', revision:'1'},
  {url: '/assets/infoligaapp.png', revision:'1'},
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ]
  })
);

workbox.routing.registerRoute( 
  new RegExp('https://api.football-data.org/v2'), 
  workbox.strategies.staleWhileRevalidate({ 
      cacheName: 'Football-data',
      plugins: [ 
          new workbox.cacheableResponse.Plugin({
              statuses: [200],
          }),
          new workbox.expiration.Plugin({
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
              maxEntries: 30,
          }), 
      ]
  })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});


