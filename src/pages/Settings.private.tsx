import { FC } from "react";

// Features

import { SwitchLanguage } from "@/features/theme";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeSwitch, DeExpand } from "@/shared/ui";

// Icon

import { IoIosNotifications } from "react-icons/io";
import { MdLanguage } from "react-icons/md";

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
      <DeExpand
        title={$t.settingsChooseLangugeExpandPanelTitle}
        icon={<MdLanguage className="h-5 w-5 dark:text-zinc-400" />}
      >
        <SwitchLanguage />
      </DeExpand>
      <DeExpand
        title={$t.settingsPermissionGetNotifications}
        icon={<IoIosNotifications className="h-6 w-6 dark:text-zinc-400" />}
      >
        <DeSwitch
          label={$t.settingsPermissionGetNotifications}
          onChange={setPermissionNotifications}
          className="m-3"
        />
      </DeExpand>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>

      <p></p>
    </div>
  );
};

export default Settings;
