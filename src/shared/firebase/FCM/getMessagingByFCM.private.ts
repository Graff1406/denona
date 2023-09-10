import { app } from "../app/public";
import { getMessaging, onMessage } from "firebase/messaging";

const messaging = getMessaging(app);

export default () => {
  console.log("messages");

  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);

    // ...
  });
};
