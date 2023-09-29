import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Features

import { useUserStore } from "@/features/auth";

// Shared

import { path } from "@/shared/constants";

const accessiblePages = [path.home, path.help];

function useRouteUnderGarde() {
  // Use

  const { user } = useUserStore();
  const locate = useLocation();

  const [isRouteUnderGuarder, setRouteUnderGarde] = useState(false);

  useEffect(() => {
    const unAuthorizedUser = !user.auth;
    const shouldRender =
      !unAuthorizedUser || accessiblePages.includes(locate.pathname);

    setRouteUnderGarde(shouldRender);
  }, [user.auth, path.home]);

  return { isRouteUnderGuarder };
}

export default useRouteUnderGarde;
