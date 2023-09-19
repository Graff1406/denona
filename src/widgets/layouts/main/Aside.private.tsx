import { FC, ReactElement } from "react";

// Features

import { SwitchLanguage, SwitchThemeColor } from "@/features/theme";
import { useUserStore } from "@/features/auth";
import { useAppInstallPWA } from "@/features/PWA";

// Shared

import { DnIconButton, DnButton } from "@/shared/ui";
import { signInGoogleWithPopup } from "@/shared/firebase";
import { useTranslations, useOnlineStatus } from "@/shared/hooks";
import { path } from "@/shared/constants";

// Icons

import { FcGoogle } from "react-icons/fc";
import { VscSettings } from "react-icons/vsc";
import { RiLogoutCircleRLine } from "react-icons/ri";

interface Props {
  open: boolean;
  spinnerLogout: boolean;
  aside?: ReactElement;
  handleLogout: () => Promise<void>;
}

const Aside: FC<Props> = ({ open, spinnerLogout, aside, handleLogout }) => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();
  const { isPWAInstalled, onInstallPWA } = useAppInstallPWA();
  const { appIsOnline } = useOnlineStatus();

  // methods
  const onAuthByGoogle = () => {
    signInGoogleWithPopup();
  };

  return (
    <aside
      className={`flex-col grow min-w-[300px] max-w-[460px] tablet:w-[460px] transition-all duration-300 border-r dark:border-r-zinc-700 overflow-hidden bg-inherit z-20 absolute tablet:relative tablet:translate-x-0 ${
        open ? "" : "-translate-x-[460px]"
      }`}
      id="menu"
      aria-labelledby="menu-toggle"
      aria-hidden={open}
    >
      {/* Settings buttons */}

      <div className="flex items-center justify-between px-3 py-2 border-0 border-b border-b-zinc-200 dark:border-b-zinc-700">
        <SwitchLanguage />
        <div className="flex gap-2">
          <DnIconButton
            icon={<VscSettings className="w-6 h-6" />}
            areaLabel={$t.appSettingsButtonOnMenu}
            to={path.settings}
          />
          <SwitchThemeColor />
          {user.auth && (
            <DnIconButton
              icon={<RiLogoutCircleRLine className="h-6 w-6" />}
              title={$t.logoutButtonAreaLabel}
              areaLabel={$t.logoutButtonAreaLabel}
              loading={spinnerLogout}
              onClick={handleLogout}
            />
          )}
        </div>
      </div>

      {/* Install PWA app */}

      {!isPWAInstalled && (
        <div className="flex items-center justify-center px-3 py-2 border-0 border-b border-b-zinc-200 dark:border-b-zinc-700">
          <DnButton
            title={$t.appInstallPWATitle}
            areaLabel={$t.appInstallPWAAreaLabel}
            label={$t.appInstallPWALabel}
            className="w-full"
            cta
            onClick={onInstallPWA}
          />
        </div>
      )}

      {/* Nav list */}

      <nav className="scrollbar overflow-y-auto h-[calc(100vh-121px)] w-full p-2">
        {aside ?? user.auth ? (
          <ul>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((el) => (
              <li
                key={el}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer rounded-md"
              >
                {el}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center h-40">
            <DnButton
              label={$t.homePageBtnLabelSignInWithGoogle}
              areaLabel={$t.homePageBtnAreaLabelSignInWithGoogle}
              title={$t.homePageBtnTitleSignInWithGoogle}
              icon={<FcGoogle className="icon" />}
              disabled={!appIsOnline}
              onClick={onAuthByGoogle}
            />
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Aside;
