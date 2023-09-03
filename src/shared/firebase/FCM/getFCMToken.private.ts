import { VAPID_KEY } from "./vapidKey.private";
import { messaging } from "./messaging.private";
import { getToken } from "firebase/messaging";
import {
  DEVICE_NOTIFICATION_TOKENS,
  LS_DEVICE_NOTIFICATION_TOKEN,
} from "@/shared/constants";

import { addDocument, deleteDocument } from "@/shared/firebase";

import { UAParser } from "ua-parser-js";

type Device = {
  browser: string | undefined;
  os: string | undefined;
  engine: string | undefined;
  device: { vendor: string | undefined; type: string | undefined };
};

const parser = new UAParser();
const t = parser.getResult();
console.log(t);

const getDeviceDescription = (): Device => {
  const parser = new UAParser();
  const ua = parser.getResult();
  const options: Device = {
    browser: ua.browser.name,
    os: ua.os.name,
    engine: ua.engine.name,
    device: {
      vendor: ua.device.vendor,
      type: ua.device.type,
    },
  };
  return options;
};

const createdBy = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("default", options);
  const formattedDateAndTime = formatter.format(now);

  return formattedDateAndTime;
};

export default (): void => {
  const deviceNotificationToken: string | null = localStorage.getItem(
    LS_DEVICE_NOTIFICATION_TOKEN
  );

  const handleSuccessPermission = (
    token: string,
    options: Device & { createdBy: string }
  ) => {
    addDocument(DEVICE_NOTIFICATION_TOKENS, { token, ...options }, token);
    localStorage.setItem(LS_DEVICE_NOTIFICATION_TOKEN, token);
  };

  const handleDeniedPermission = (token: string) => {
    deleteDocument(DEVICE_NOTIFICATION_TOKENS, token);
    localStorage.removeItem(LS_DEVICE_NOTIFICATION_TOKEN);
  };

  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        getToken(messaging, { vapidKey: VAPID_KEY })
          .then((currentToken: string) => {
            if (currentToken && !deviceNotificationToken) {
              handleSuccessPermission(currentToken, {
                ...getDeviceDescription(),
                createdBy: createdBy(),
              });
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
