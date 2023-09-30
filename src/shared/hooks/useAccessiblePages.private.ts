import { useState, useEffect } from "react";

// Features

import { useUserStore } from "@/features/auth";

// Shared

import { path } from "@/shared/constants";

const pages = [path.help];

function useAccessiblePages() {
  // Use

  const { user } = useUserStore();

  const [accessiblePages, setAccessiblePages] = useState(false);

  useEffect(() => {
    const guarder =
      !!(!user.auth && pages.includes(location.pathname)) ||
      !!(user.auth && location.pathname !== path.home);

    setAccessiblePages(guarder);
  }, [user.auth, location.pathname]);

  return { accessiblePages };
}

export default useAccessiblePages;
