// Notification.requestPermission()
//   .then((permission) => {
//     let timerId = setInterval(() => {
//       console.log("permission:  ", permission);
//       self.registration.showNotification("Заголовок уведомления", {
//         body: "Текст уведомления",
//         icon: "иконка.png",
//         // Другие параметры уведомления
//       });
//     }, 3000);

//     // остановить вывод через 5 секунд
//     setTimeout(() => {
//       clearInterval(timerId);
//     }, 500000);
//   })
//   .catch((err) => {
//     console.log("requestPermission: ", err);
//   });

// const addNotification  = require()

// повторить с интервалом 2 секунды
let timerId = setInterval(() => {
  console.log("self", Notification.requestPermission);
  self.registration.showNotification("Заголовок уведомления", {
    body: "Текст уведомления",
    icon: "иконка.png",
    // Другие параметры уведомления
  });
}, 3000);

// остановить вывод через 5 секунд
setTimeout(() => {
  clearInterval(timerId);
}, 500000);

// import { app } from "../src/shared/firebase/app/public";
// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// const messaging = getMessaging(app);

// onBackgroundMessage(messaging, (payload) => {
//   let timerId = setInterval(() => {
//     console.log("self", payload);
//     self.registration.showNotification("Заголовок уведомления", {
//       body: "Текст уведомления",
//       icon: "иконка.png",
//       // Другие параметры уведомления
//     });
//   }, 3000);

//   // остановить вывод через 5 секунд
//   setTimeout(() => {
//     clearInterval(timerId);
//   }, 500000);
// });
