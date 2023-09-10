self.addEventListener("message", function (event) {
  console.log("🚀 ~ file: ws.js:38 ~ event.data:", event.data.data);
  setTimer(event.data.data);
});

function setTimer(data) {
  const intervalId = setInterval(() => {
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "https://aa10-37-73-86-230.ngrok-free.app/images/pwa-64x64.png",
      renotify: true,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: "vibration-sample",
    });
  }, 7000);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 35000);
}
