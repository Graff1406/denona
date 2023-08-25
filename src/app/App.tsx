import { FC, StrictMode, useState, useEffect } from "react";
import Router from "./router";

// features

import { useUserStore } from "@/features/auth";

// Shared

import { authState, type AuthUser } from "@/shared/firebase";
import { useTranslations } from "@/shared/hooks";

const App: FC = () => {
  // Use

  const { dispatchSetUser } = useUserStore();
  const { translationsLoaded } = useTranslations();

  // State

  const [loadingUser, setLoadingUser] = useState(true);

  // Hooks

  useEffect(() => {
    authState((auth: AuthUser | null): void => {
      if (auth) {
        dispatchSetUser(auth);
      }
      setLoadingUser(() => false);
    });
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
