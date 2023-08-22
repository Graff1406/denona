import { StrictMode, useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Router from "./router";

// Firebase

import { authState, type AuthUser } from "@/shared/firebase/public";

// RTK

import { useAppDispatch } from "@/shared/hooks/public";

// features

import { setUser } from "@/features/auth/public";

function App() {
  const dispatch = useAppDispatch();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    authState((auth: AuthUser | null): void => {
      if (auth) {
        dispatch(setUser(auth));
      }
      setLoadingUser(() => false);
    });
  }, []);

  return (
    <HelmetProvider>
      <StrictMode>
        {loadingUser ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <Router />
        )}
      </StrictMode>
    </HelmetProvider>
  );
}

export default App;
