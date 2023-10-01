import { FC, useState, useEffect } from "react";
import Router from "./router";

// features

import { useUserStore } from "@/features/auth";
import { useAppInstallPWA } from "@/features/PWA";

// Entities

import { indexDB } from "@/entities/indexDB";
import { addDocument, authState, watchDocumentById } from "@/entities/firebase";
import { User } from "@/entities/models";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeImage } from "@/shared/ui";

import loadingSvg from "/assets/owl_spinner.svg";
import { USERS } from "@/shared/constants";

const App: FC = () => {
  // Use

  const { dispatchSetUser } = useUserStore();
  const { loadingTranslations } = useTranslations();
  const { addEventListenerBeforeInstallPrompt } = useAppInstallPWA();

  // State

  const [loadingUser, setLoadingUser] = useState(true);

  // Methods
  const initFirebaseServices = async (): Promise<void> => {
    const saveUserToServer = async (user: User): Promise<User> => {
      await addDocument(USERS, user, user.uid);
      return user;
    };
    const db = await indexDB.user.get({ id: 1 });
    if (db?.user?.uid) {
      dispatchSetUser(db.user);
      setLoadingUser(() => false);
    }

    authState(async (auth: User | null): Promise<void> => {
      if (auth) {
        watchDocumentById<User>(USERS, auth?.uid, async (userFromServer) => {
          const data = userFromServer
            ? { ...userFromServer, ...auth }
            : await saveUserToServer(auth);

          const jsonUserIndexBDData = JSON.stringify(db?.user);
          const jsonUserServerData = JSON.stringify(data);

          if (db?.user?.uid && jsonUserIndexBDData !== jsonUserServerData) {
            indexDB.user.put({ id: 1, user: data });
          } else {
            indexDB.user.add({ id: 1, user: data });
          }
          dispatchSetUser(data);
        });
      }

      setLoadingUser(() => false);
    });
  };

  // Hooks

  useEffect(() => {
    initFirebaseServices();

    const unsubscribe = addEventListenerBeforeInstallPrompt();
    return unsubscribe;
  }, []);

  return (
    <>
      {loadingUser || loadingTranslations ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <DeImage
            lazy={false}
            src={loadingSvg}
            alt="Loading..."
            className="animate-ping w-10 h-10"
          />
        </div>
      ) : (
        <Router />
      )}
    </>
  );
};

export default App;
