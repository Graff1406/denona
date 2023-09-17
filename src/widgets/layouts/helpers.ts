// Shared

import { path } from "@/shared/constants";

export const getCurrentRouteData = (
  route: string,
  $t: { [key: string]: string }
) => {
  if (path.settings === route)
    return {
      title: $t.settingsPageTitle,
      description: $t.settingsPageDescription,
    };

  return {
    title: $t.homePageTitle,
    description: $t.homePageDescription,
  };
};
