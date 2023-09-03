import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
// import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import { TranslationsProvider } from "./contexts";

// Shared

import { getFCMToken } from "@/shared/firebase";

getFCMToken();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <TranslationsProvider>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </TranslationsProvider>
  </StrictMode>
);
