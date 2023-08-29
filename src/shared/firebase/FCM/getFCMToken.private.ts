import { VAPID_KEY } from "./vapidKey.private";
import { messaging } from "./messaging.private";
import { getToken } from "firebase/messaging";
import {
  DEVICE_NOTIFICATION_TOKENS,
  LS_DEVICE_NOTIFICATION_TOKEN,
} from "@/shared/constants";

import { addDocument, deleteDocument } from "@/shared/firebase";

export default (): void => {
  // const DENIED = "denied";
  const deviceNotificationToken: string | null = localStorage.getItem(
    LS_DEVICE_NOTIFICATION_TOKEN
  );

  const handleSuccessPermission = (token: string) => {
    addDocument(DEVICE_NOTIFICATION_TOKENS, { token }, token);
    localStorage.setItem(LS_DEVICE_NOTIFICATION_TOKEN, token);
  };

  const handleDeniedPermission = (token: string) => {
    deleteDocument(DEVICE_NOTIFICATION_TOKENS, token);
    localStorage.removeItem(LS_DEVICE_NOTIFICATION_TOKEN);
  };

  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("permission: ", permission);

        getToken(messaging, { vapidKey: VAPID_KEY })
          .then((currentToken: string) => {
            if (currentToken && !deviceNotificationToken) {
              handleSuccessPermission(currentToken);
            } else if (!currentToken && deviceNotificationToken) {
              handleDeniedPermission(deviceNotificationToken);
            }
          })
          .catch((error) => {
            console.log(
              "An error occurred while retrieving token from FCM: ",
              error.code
            );
            if (deviceNotificationToken)
              handleDeniedPermission(deviceNotificationToken);
          });
      } else {
        console.log("permission: ", permission);
        if (deviceNotificationToken)
          handleDeniedPermission(deviceNotificationToken);
      }
    })
    .catch((err) => {
      console.log(
        "Notification.requestPermission has made denied unfortunately",
        err
      );
      if (deviceNotificationToken) {
        handleDeniedPermission(deviceNotificationToken);
      }
    });
};
