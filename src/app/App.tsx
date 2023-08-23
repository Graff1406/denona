import { StrictMode, useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Router from "./router";

// App

import { TranslationsProvider } from "@/app/contexts";

// features

import { useUserStore } from "@/features/auth";

// Shared

import { authState, type AuthUser } from "@/shared/firebase";

function App() {
  // Use

  const { dispatchSetUser } = useUserStore();

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
    <HelmetProvider>
      <StrictMode>
        <TranslationsProvider>
          {loadingUser ? (
            <div className="w-screen h-screen flex justify-center items-center">
              <div className="custom-loader"></div>
            </div>
          ) : (
            <Router />
          )}
        </TranslationsProvider>
      </StrictMode>
    </HelmetProvider>
  );
}

export default App;
