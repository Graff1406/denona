// self.addEventListener("push", function (event) {
//   const options = {
//     body: event.data.text(),
//     icon: "icon.png",
//     badge: "badge.png",
//   };

//   event.waitUntil(
//     self.registration.showNotification("Заголовок уведомления", options)
//   );
// });

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyChJudm_9-zb2NvRRqI2hmeqk5pqYCEomI",
  authDomain: "denona-4b33c.firebaseapp.com",
  projectId: "denona-4b33c",
  storageBucket: "denona-4b33c.appspot.com",
  messagingSenderId: "585446113699",
  appId: "1:585446113699:web:9e3d609c39de65f9d71a16",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("onBackgroundMessage-body: ", payload.notification.body);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
