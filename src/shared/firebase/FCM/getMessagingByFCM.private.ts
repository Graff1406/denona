import { app } from "../app/public";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const messaging = getMessaging(app);

export default () => {
  console.log("messages");

  onBackgroundMessage(messaging, (payload) => {
    console.log("Message received. ", payload);

    // ...
  });
};
