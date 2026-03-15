self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  self.registration.showNotification(data.title || 'NEXUS', {
    body: data.body || 'New message',
    icon: '/Nexus-Chat/icon-192.png',
    tag: 'nexus-msg',
    renotify: true,
    vibrate: [200, 100, 200]
  });
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/Nexus-Chat/'));
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
