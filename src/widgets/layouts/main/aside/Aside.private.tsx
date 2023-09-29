import { FC, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

// Features

import { SwitchThemeColor } from "@/features/theme";
import { useUserStore } from "@/features/auth";
import { useAppInstallPWA } from "@/features/PWA";
import { SwitchLanguage } from "@/features/theme";

// Entities

import { signInGoogleWithPopup } from "@/entities/firebase";

// Shared

import { DnIconButton, DnButton, DeImage, DeMenu } from "@/shared/ui";
import { useTranslations, useOnlineStatus } from "@/shared/hooks";
import { path } from "@/shared/constants";

// Icons

import { FcGoogle } from "react-icons/fc";
import { VscSettings } from "react-icons/vsc";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdHelpOutline, MdLanguage } from "react-icons/md";

// Data

import Menu from "./Menu.private";

interface Props {
  open: boolean;
  spinnerLogout: boolean;
  aside?: ReactElement;
  onUserLogout: () => Promise<void>;
}

const Aside: FC<Props> = ({ open, spinnerLogout, aside, onUserLogout }) => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();
  const { isPWAInstalled, onInstallPWA } = useAppInstallPWA();
  const { appIsOnline } = useOnlineStatus();
  const location = useLocation();

  // methods
  const onAuthByGoogle = () => {
    try {
      signInGoogleWithPopup();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <aside
      className={`flex-col grow min-w-[300px] max-w-[460px] tablet:w-[460px] border-r dark:border-r-zinc-700 overflow-hidden bg-inherit z-20 absolute tablet:relative tablet:translate-x-0 ${
        open ? "" : "-translate-x-[460px]"
      }`}
      id="menu"
      aria-labelledby="menu-toggle"
      aria-hidden={open}
    >
      <div className="flex items-center justify-between px-3 py-2 border-0 border-b border-b-zinc-200 dark:border-b-zinc-700">
        {/* Settings button for move to settings route */}

        {user.auth && (
          <Link
            to={path.settings}
            className={`flex items-center space-x-2 min-w-max min-h-max border border-zinc-200 rounded-lg p-2 animation dark:border dark:border-zinc-700 active:bg-zinc-200 dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer ${
              location.pathname === path.settings
                ? "invisible opacity-0"
                : "visible opacity-100"
            }`}
            area-label={$t.appSettingsButtonOnMenu}
            title={$t.appSettingsButtonOnMenu}
          >
            <DeImage
              src={user.auth.photoURL}
              alt={$t.userProfileImageAlt}
              className="w-6 h-6 rounded-full"
            />
            <DnIconButton
              icon={<VscSettings className="w-6 h-6" />}
              className="w-6 h-6"
            />
          </Link>
        )}

        {/* For unauthorized user translation button */}

        {/* {!unAuthorizedUser && (
          <DeMenu
            activator={
              <DnIconButton
                icon={<MdLanguage className="h-6 w-6 dark:text-zinc-400" />}
                title={$t.logoutButtonAreaLabel}
                areaLabel={$t.logoutButtonAreaLabel}
                loading={spinnerLogout}
                onClick={onUserLogout}
              />
            }
          >
            <SwitchLanguage />
          </DeMenu>
        )} */}

        <div className="flex gap-2">
          <Link
            to={path.help}
            area-label={$t.appHelpButtonAreaLabel}
            title={$t.appHelpButtonAreaLabel}
            className={`animation ${
              location.pathname === path.help
                ? "invisible opacity-0"
                : "visible opacity-100"
            }`}
          >
            <DnIconButton icon={<MdHelpOutline className="h-6 w-6" />} />
          </Link>

          <SwitchThemeColor />

          {/* User logout button */}

          {user.auth && (
            <DnIconButton
              icon={<RiLogoutCircleRLine className="h-6 w-6" />}
              title={$t.logoutButtonAreaLabel}
              areaLabel={$t.logoutButtonAreaLabel}
              loading={spinnerLogout}
              onClick={onUserLogout}
            />
          )}
        </div>
      </div>

      {/* Install PWA app */}

      {!isPWAInstalled && (
        <div className="flex items-center justify-center px-3 py-2 border-0 border-b border-b-zinc-200 dark:border-b-zinc-700">
          <DnButton
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
          <Menu />
        ) : (
          <div className="h-full flex flex-col justify-between">
            {/* Login form */}

            <div className="space-y-5 flex flex-col justify-center items-center h-3/5">
              <h2 className="text-center dark:text-zinc-400">
                {$t.appSignInTitle}
              </h2>
              <DnButton
                label={$t.homePageBtnLabelSignInWithGoogle}
                areaLabel={$t.homePageBtnAreaLabelSignInWithGoogle}
                icon={<FcGoogle className="icon" />}
                disabled={!appIsOnline}
                onClick={onAuthByGoogle}
              />
            </div>
            <footer className="border-t border-zinc-200 dark:border-zinc-700 py-2">
              <nav>
                <ul className="text-xs dark:text-zinc-400 flex gap-3 justify-center flex-wrap">
                  <li>
                    <Link
                      to="/policy"
                      className="link"
                      area-label={$t.appFooterPolicyAreaLabel}
                      title={$t.appFooterPolicyAreaLabel}
                    >
                      {$t.appFooterPolicyTitle}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/policy"
                      className="link"
                      area-label={$t.appFooterContactsAreaLabel}
                      title={$t.appFooterContactsAreaLabel}
                    >
                      {$t.appFooterContactsTitle}
                    </Link>
                  </li>
                </ul>
              </nav>
            </footer>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Aside;
