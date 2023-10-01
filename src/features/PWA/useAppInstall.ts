import { useState, useEffect } from "react";

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

const beforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
  e.preventDefault();
  deferredPrompt = e;
};

const addEventListenerBeforeInstallPrompt = () => {
  window.addEventListener("beforeinstallprompt", beforeInstallPrompt);
};

const getPWADisplayMode = (): Mode => {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  if (document.referrer.startsWith("android-app://")) {
    return "pwa";
  } else if (navigator.standalone || isStandalone) {
    return "standalone";
  }
  return "browser";
};

export default (): {
  displayModePWA: Mode;
  onInstallPWA: () => Promise<void>;
  addEventListenerBeforeInstallPrompt: () => void;
} => {
  // State

  const [displayModePWA, setDisplayModePWA] = useState<Mode>("standalone");

  // Methods

  const onInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setDisplayModePWA(getPWADisplayMode());
      }
    }
  };

  // Effects

  useEffect(() => {
    setDisplayModePWA(getPWADisplayMode());
  }, []);

  return {
    displayModePWA,
    onInstallPWA,
    addEventListenerBeforeInstallPrompt,
  };
};
