import { useState, useEffect } from "react";

// Shared

import { getFCMToken } from "@/shared/firebase";

type Mode = "pwa" | "standalone" | "browser";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Navigator {
    standalone?: boolean;
  }
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

let beforeInstallPrompt: (e: BeforeInstallPromptEvent) => void;

const addEventListenerBeforeInstallPrompt = () => {
  beforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("beforeInstallPrompt");
  };
  window.addEventListener("beforeinstallprompt", beforeInstallPrompt);
};

addEventListenerBeforeInstallPrompt();

export default (): {
  isPWAInstalled: boolean;
  displayModePWA: Mode;
  onInstallPWA: () => Promise<void>;
} => {
  // State

  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [displayModePWA, setDisplayModePWA] = useState<Mode>("browser");

  // Methods

  const onInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setIsPWAInstalled(true);
        getFCMToken();
      } else {
        window.removeEventListener("beforeinstallprompt", beforeInstallPrompt);
        addEventListenerBeforeInstallPrompt();
      }

      deferredPrompt = null;
    }
  };

  const appInstalled = () => {
    deferredPrompt = null;
    setIsPWAInstalled(true);
    // console.log("appInstalled");
  };

  const checkAppInstalled = () => {
    console.log("deferredPrompt:", deferredPrompt);
    if (deferredPrompt) window.addEventListener("appinstalled", appInstalled);
    else setIsPWAInstalled(true);
  };

  function getPWADisplayMode() {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    if (document.referrer.startsWith("android-app://")) {
      return "pwa";
    } else if (navigator.standalone || isStandalone) {
      return "standalone";
    }
    return "browser";
  }

  // Effects

  useEffect(() => {
    checkAppInstalled();
    const mode = getPWADisplayMode();

    setDisplayModePWA(mode);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallPrompt);
      window.removeEventListener("appinstalled", appInstalled);
    };
  }, []);

  return { isPWAInstalled, displayModePWA, onInstallPWA };
};
