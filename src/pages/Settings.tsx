import { FC } from "react";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeSwitch, DeExpand } from "@/shared/ui";

const Settings: FC = () => {
  // Use

  const { $t } = useTranslations();

  // State

  // Methods

  const setPermissionNotifications = (permission: boolean) => {
    console.log(permission);
  };

  return (
    <div className="flex flex-col gap-4">
      <DeExpand title={$t.settingsPermissionGetNotifications}>
        <DeSwitch
          label={$t.settingsPermissionGetNotifications}
          onChange={setPermissionNotifications}
          className="m-3"
        />
      </DeExpand>
    </div>
  );
};

export default Settings;
