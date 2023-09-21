import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

// App

import App from "./App.tsx";
import "/public/index.css"; // move to "public" because of SW has cached

// Store

import { store } from "./store/index.ts";
import { Provider } from "react-redux";

// Context

import { TranslationsProvider } from "./contexts";

// Service Worker

// import { registerSW } from "virtual:pwa-register";

// registerSW({
//   immediate: true,
//   // onNeedRefresh() {
//   //   console.log("onNeedRefresh");
//   // },
//   // onOfflineReady() {
//   //   console.log("onOfflineReady", Date.now());
//   // },
// });

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
