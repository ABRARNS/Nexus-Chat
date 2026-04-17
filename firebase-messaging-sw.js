// Firebase Messaging Service Worker
// File location in repo: /firebase-messaging-sw.js (root)
// GitHub Pages will serve it at /Nexus-Chat/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyBBEpPg36DpbKdXJzckFvScOT1T8zeXEYk",
  authDomain:"nexus-chat-dca4c.firebaseapp.com",
  projectId:"nexus-chat-dca4c",
  storageBucket:"nexus-chat-dca4c.firebasestorage.app",
  messagingSenderId:"508912791206",
  appId:"1:508912791206:web:df741cb27b0b6b96c2ce67"
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'NEXUS', {
    body: body || '',
    icon: icon || '/Nexus-Chat/icon-192.png',
    badge: '/Nexus-Chat/icon-192.png',
    data: payload.data || {},
  });
});

// Click opens the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://abrarns.github.io/Nexus-Chat/index.html')
  );
});
