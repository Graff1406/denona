import { VAPID_KEY } from "./vapidKey.private";
import { messaging } from "./messaging.private";
import { getToken } from "firebase/messaging";
import {
  DEVICE_NOTIFICATION_TOKENS,
  LS_DEVICE_NOTIFICATION_TOKEN,
  LS_DEVICE_NOTIFICATION_ACCESS_ERROR,
} from "@/shared/constants";

import { addDocument, deleteDocument } from "@/shared/firebase";

import { UAParser } from "ua-parser-js";

type Device = {
  browser: string;
  os: string;
  engine: string;
  device: { vendor: string; type: string };
};

const getDeviceDescription = (): Device => {
  const parser = new UAParser();
  const ua = parser.getResult();
  const options: Device = {
    browser: ua.browser.name ?? "",
    os: ua.os.name ?? "",
    engine: ua.engine.name ?? "",
    device: {
      vendor: ua.device.vendor ?? "",
      type: ua?.device.type ?? "",
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
  const parseLS = (name: string): any => {
    try {
      return JSON.parse(localStorage.getItem(name) ?? "");
    } catch (error) {
      return "";
    }
  };

  const deviceNotificationToken: string | null = localStorage.getItem(
    LS_DEVICE_NOTIFICATION_TOKEN
  );

  const deviceNotificationAccessErrorMessage = parseLS(
    LS_DEVICE_NOTIFICATION_ACCESS_ERROR
  );

  const getInfoSW = async (): Promise<string> => {
    let sw = "";

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      registrations.forEach(
        (registration, i) =>
          (sw +=
            i === registrations.length - 1
              ? `${registration?.active?.scriptURL}`
              : `${registration?.active?.scriptURL}, `)
      );
    }

    return sw;
  };

  const savedDeviceNotificationError = async (errorMessage: string) => {
    if (!deviceNotificationAccessErrorMessage) {
      // temporary for development purposes

      const sw = await getInfoSW();
      const options = {
        errorMessage,
        sw,
        createdBy: createdBy(),
        ...getDeviceDescription(),
      };

      const ua = await addDocument(
        LS_DEVICE_NOTIFICATION_ACCESS_ERROR,
        options
      );

      if (ua?.id) {
        localStorage.setItem(
          LS_DEVICE_NOTIFICATION_ACCESS_ERROR,
          JSON.stringify({
            id: ua?.id,
            ...options,
          })
        );
      }
    }
  };

  const handleSuccessPermission = async (
    token: string,
    options: Device & { createdBy: string }
  ) => {
    const sw = await getInfoSW();
    addDocument(DEVICE_NOTIFICATION_TOKENS, { token, ...options, sw }, token);
    localStorage.setItem(LS_DEVICE_NOTIFICATION_TOKEN, token);

    if (deviceNotificationAccessErrorMessage?.id) {
      localStorage.removeItem(LS_DEVICE_NOTIFICATION_ACCESS_ERROR);
      deleteDocument(
        LS_DEVICE_NOTIFICATION_ACCESS_ERROR,
        deviceNotificationAccessErrorMessage?.id
      );
    }
  };

  const handleDeniedPermission = (token: string, errorMessage: string) => {
    deleteDocument(DEVICE_NOTIFICATION_TOKENS, token);
    localStorage.removeItem(LS_DEVICE_NOTIFICATION_TOKEN);
    savedDeviceNotificationError(errorMessage);
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
              handleDeniedPermission(
                deviceNotificationToken,
                `permission: ${permission}`
              );
            }
          })
          .catch((error) => {
            if (deviceNotificationToken)
              handleDeniedPermission(deviceNotificationToken, error);
            else savedDeviceNotificationError(error);
          });
      } else {
        if (deviceNotificationToken)
          handleDeniedPermission(
            deviceNotificationToken,
            `permission: ${permission}`
          );
        else savedDeviceNotificationError(`permission: ${permission}`);
      }
    })
    .catch((error) => {
      if (deviceNotificationToken) {
        handleDeniedPermission(deviceNotificationToken, error);
      } else savedDeviceNotificationError(error);
    });
};
