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
  else if (path.help === route)
    return {
      head: {
        title: $t.pageHelpHeadTitle,
        description: $t.pageHelpHeadDescroption,
      },
      title: $t.pageHelpHeadTitle,
    };
  else if (path.create === route)
    return {
      head: {
        title: $t.pageCreateTaskHeadTitle,
        description: $t.pageCreateTaskHeadDescription,
      },
      title: $t.pageCreateTaskHeadTitle,
    };
  else if (path.defineLifeSphere === route)
    return {
      head: {
        title: $t.appPageLifeSphereTitle,
        description: $t.appPageLifeSphereDescription,
      },
      title: $t.appPageLifeSphereTitle,
    };
  else if (path.goal === route)
    return {
      head: {
        title: $t.createTaskCalendarSingleTaskGoalLabel,
        description: $t.goalDescription,
      },
      title: $t.createTaskCalendarSingleTaskGoalLabel,
    };

  return {
    head: {
      title: $t.homePageTitle,
      description: $t.homePageDescription,
    },
    title: "",
  };
};
