// Shared

import { path } from "@/shared/constants";

export const getCurrentRouteData = (
  route: string,
  $t: { [key: string]: string }
) => {
  if (path.settings === route)
    return {
      head: {
        title: $t.settingsPageTitle,
        description: $t.settingsPageDescription,
      },
      title: $t.settingsPageTitle,
    };

  return {
    head: {
      title: $t.settingsPageTitle,
      description: $t.settingsPageDescription,
    },
    title: "",
  };
};
