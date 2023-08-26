import { VAPID_KEY } from "./vapidKey.private";
import { messaging } from "./messaging.private";
import { getToken } from "firebase/messaging";

export default (
  callback?: (token: string) => void,
  callbackError?: (code: string) => void
): void => {
  getToken(messaging, {
    vapidKey: VAPID_KEY,
  })
    .then((token: string) => {
      if (callback) callback(token);
    })
    .catch((error) => {
      console.log(
        "An error occurred while retrieving token from FCM: ",
        error.code
      );
      if (callbackError) callbackError(error.code);
    });
};
