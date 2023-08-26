import { FC, useState, useEffect } from "react";
import Router from "./router";

// features

import { useUserStore } from "@/features/auth";

// Shared

import {
  authState,
  type AuthUser,
  getFCMToken,
  addDocument,
  deleteDocument,
} from "@/shared/firebase";
import { useTranslations } from "@/shared/hooks";
import {
  DEVICE_NOTIFICATION_TOKENS,
  LS_DEVICE_NOTIFICATION_TOKEN,
} from "@/shared/constants";

const App: FC = () => {
  // Use

  const { dispatchSetUser } = useUserStore();
  const { translationsLoaded } = useTranslations();

  // State

  const [loadingUser, setLoadingUser] = useState(true);

  // Methods

  const initFirebaseServices = (): void => {
    const deviceNotificationToken: string | null = localStorage.getItem(
      LS_DEVICE_NOTIFICATION_TOKEN
    );
    console.log(
      deviceNotificationToken && Notification.permission === "denied"
    );

    if (!deviceNotificationToken && Notification.permission === "granted")
      getFCMToken(
        (token) => {
          addDocument(DEVICE_NOTIFICATION_TOKENS, { token }, token);
          localStorage.setItem(LS_DEVICE_NOTIFICATION_TOKEN, token);
        },
        (codeError: string) => {
          console.log("errorCode: ", codeError);
        }
      );
    else if (deviceNotificationToken && Notification.permission === "denied") {
      deleteDocument(DEVICE_NOTIFICATION_TOKENS, deviceNotificationToken);
      localStorage.removeItem(LS_DEVICE_NOTIFICATION_TOKEN);
    }

    authState((auth: AuthUser | null): void => {
      if (auth) {
        dispatchSetUser(auth);
      }
      setLoadingUser(() => false);
    });
  };

  // Hooks

  useEffect(() => {
    initFirebaseServices();
  }, []);

  return (
    <>
      {loadingUser || !translationsLoaded ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <Router />
      )}
    </>
  );
};

export default App;
