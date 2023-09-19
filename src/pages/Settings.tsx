import { FC } from "react";

// Shared

import { useTranslations } from "@/shared/hooks";
// import { DeExpand, DeSwitch } from "@/shared/ui";

const Settings: FC = () => {
  // Use

  const { $t } = useTranslations();

  // State

  // Methods

  const setPermissionNotifications = (permission: boolean) => {
    console.log(permission);
  };

  return (
    <>
      <DeSwitch
        label={$t.settingsPermissionGetNotifications}
        onChange={setPermissionNotifications}
        className="m-3"
      />

      {/* <DeExpand title={$t.settingsPermissionGetNotifications}>
        <DeSwitch
          label={$t.settingsPermissionGetNotifications}
          onChange={setPermissionNotifications}
          className="m-3"
        />
      </DeExpand> */}
    </>
  );
};

export default Settings;
