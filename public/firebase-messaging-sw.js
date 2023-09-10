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
  console.log("onBackgroundMessage: ", payload.notification);

  const { title, options } = getData(payload);

  self.registration.showNotification(title, options);
});

function getData(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://aa10-37-73-86-230.ngrok-free.app/images/pwa-64x64.png",
  };

  return { title: notificationTitle, options: notificationOptions };
}
