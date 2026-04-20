// Firebase Messaging Service Worker — NEXUS-CHAT
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Force new SW to activate immediately — never gets stuck on "waiting"
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

firebase.initializeApp({
  apiKey:"AIzaSyBBEpPg36DpbKdXJzckFvScOT1T8zeXEYk",
  authDomain:"nexus-chat-dca4c.firebaseapp.com",
  projectId:"nexus-chat-dca4c",
  storageBucket:"nexus-chat-dca4c.firebasestorage.app",
  messagingSenderId:"508912791206",
  appId:"1:508912791206:web:df741cb27b0b6b96c2ce67"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'NEXUS', {
    body: body || '',
    icon: icon || '/Nexus-Chat/icon-192.png',
    badge: '/Nexus-Chat/icon-192.png',
    data: payload.data || {},
    vibrate: [200, 100, 200],
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(list => {
      // Focus existing tab if open
      for (const client of list) {
        if (client.url.includes('Nexus-Chat') && 'focus' in client) return client.focus();
      }
      // Otherwise open new tab
      return clients.openWindow('https://abrarns.github.io/Nexus-Chat/index.html');
    })
  );
});
