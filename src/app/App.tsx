import { FC, useState, useEffect } from "react";
import Router from "./router";

// features

import { useUserStore } from "@/features/auth";

// Entities

import { indexDB } from "@/entities/indexDB";
import { authState } from "@/entities/firebase";
import { User } from "@/entities/models";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeImage } from "@/shared/ui";

import loadingSvg from "/assets/owl_spinner.svg";

const App: FC = () => {
  // Use

  const { dispatchSetUser } = useUserStore();
  const { loadingTranslations } = useTranslations();

  // State

  const [loadingUser, setLoadingUser] = useState(true);

  // Methods

  const initFirebaseServices = async (): Promise<void> => {
    const db = await indexDB.user.get({ id: 1 });
    if (db?.user?.uid) {
      dispatchSetUser(db.user);
      setLoadingUser(() => false);
    }

    authState((auth: User | null): void => {
      if (auth && db?.user?.uid) {
        indexDB.user.put({ id: 1, user: auth });
      } else if (auth && !db?.user?.uid) {
        dispatchSetUser(auth);
        indexDB.user.add({ id: 1, user: auth });
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
