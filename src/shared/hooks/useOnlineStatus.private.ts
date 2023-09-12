import { useState, useEffect } from "react";

export default () => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(
    typeof window !== "undefined" ? window.navigator.onLine : true
  );

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setOnlineStatus(false);
      });
      window.removeEventListener("online", () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  return { appIsOnline: onlineStatus };
};
