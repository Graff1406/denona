import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// Icons

import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdPersonAdd, MdMenu } from "react-icons/md";

// Features

import { SwitchLanguage, SwitchThemeColor } from "@/features/theme";
import { useUserStore } from "@/features/auth";
import { useAppInstallPWA } from "@/features/PWA";

// Shared

import { DnIconButton, DnButton } from "@/shared/ui";
import { signOut, signInGoogleWithPopup } from "@/shared/firebase";
import { useTranslations, useOnlineStatus } from "@/shared/hooks";

// Icons

import { FcGoogle } from "react-icons/fc";
import { VscSettings } from "react-icons/vsc";
import { MdArrowBackIosNew } from "react-icons/md";

// Helpers

import { getCurrentRouteData } from "./helpers";

interface Props {
  content?: ReactElement;
  aside?: ReactElement;
  headerRight?: ReactElement;
  isToggleMenu?: boolean;
  onToggleMenu?: (callback: () => void) => void;
}

const MainLayout: FC<Props> = ({
  headerRight,
  aside,
  content,
  isToggleMenu,
  onToggleMenu = (callback) => callback(),
}): ReactElement => {
  // Use

  const { user, dispatchResetUser } = useUserStore();
  const { $t } = useTranslations();
  const { isPWAInstalled, onInstallPWA } = useAppInstallPWA();
  const { appIsOnline } = useOnlineStatus();
  const location = useLocation();
  const navigate = useNavigate();

  // State

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [spinnerLogout, setSpinnerLogout] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [showTextForAppIsOffline, setShowTextForAppIsOffline] = useState(false);

  // Get helper data
  const { title, head } = getCurrentRouteData(location.pathname, $t);

  // methods

  const handleToggleMenu = () => onToggleMenu(() => setOpen(!open));
  const handleLogout = async () => {
    setSpinnerLogout(() => true);
    await signOut();
    dispatchResetUser();
    setSpinnerLogout(() => false);
  };
  const onAuthByGoogle = () => {
    signInGoogleWithPopup();
  };
  const goBack = () => {
    navigate(-1);
  };

  // Hooks

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useEffect(() => {
    if (isMounted) handleToggleMenu();
    else setIsMounted(true);
  }, [isToggleMenu]);

  useEffect(() => {
    if (open) setOpen(false);
    setIsHomePage(location.pathname === "/");
  }, [location]);
  useEffect(() => {
    setShowTextForAppIsOffline(!appIsOnline);
    setTimeout(() => {
      setShowTextForAppIsOffline(false);
    }, 3500);
  }, [appIsOnline]);

  return (
    <>
      <Helmet>
        <title>{appIsOnline ? head.title : $t.appNoInternetConnection}</title>
        <meta name="description" content={head.description} />
      </Helmet>

      {/* System bar */}

      <div
        className={`bg-zinc-700 text-white text-xs w-full  flex justify-center items-center leading-6 animation absolute bottom-0 left-0 right-0 z-50 ${
          showTextForAppIsOffline ? "h-6 opacity-100" : "h-0 opacity-0"
        }`}
      >
        {$t.appNoInternetConnection}
      </div>

      {/* Page container */}

      <div className="dark:bg-zinc-900 dark:text-zinc-400 transition-all">
        {/* Main Col */}

        <div className="h-screen flex-col grow mx-auto max-w-[900px] tablet:border-x dark:border-zinc-700 bg-white dark:bg-zinc-800">
          {/* Logo, Arrow back, Page Title, right btn */}

          <header
            className="border-b dark:border-b-zinc-700 flex justify-between items-center space h-16 overflow-hidden"
            role="banner"
          >
            <div className="flex gap-1 truncate text-ellipsis overflow-hidden">
              {/* Logo */}
              <Link
                to="/"
                className={`flex items-center gap-4 min-w-max ${
                  !isHomePage ? "hidden tablet:flex" : ""
                }`}
              >
                <img
                  src="/images/favicon.ico"
                  alt={$t.logoImgAltText}
                  title={$t.logoImgAltText}
                  width={32}
                  height={32}
                />
                <span className="uppercase font-medium text-xl tablet:block dark:text-zinc-200">
                  {$t.mainLogo}
                </span>
              </Link>

              {/* Arrow back, Page title */}
              <div
                className={`flex grow items-center max-w-max gap-1 tablet:border-l tablet:border-l-zinc-200 tablet:mx-6 tablet:pl-2 anima ${
                  isHomePage ? "opacity-0" : "opacity-100"
                }`}
              >
                <DnIconButton
                  icon={<MdArrowBackIosNew className="h-6 w-6" />}
                  areaLabel="back"
                  onClick={goBack}
                />
                <h2 className="text-lg">{title}</h2>
              </div>
            </div>

            {/* Right btn */}

            {headerRight ?? user.auth ? (
              <DnIconButton
                className="tablet:hidden"
                icon={<MdMenu className="icon" />}
                areaLabel={$t.homePageMainBtnMobileMenuToggle}
                onClick={handleToggleMenu}
                ariaExpanded={open}
                id="menu-toggle"
                aria-controls="menu"
              />
            ) : (
              <DnButton
                className="tablet:hidden"
                label={$t.homePageBtnGetStarted}
                areaLabel={$t.homePageBtnAreaLabelGetStarted}
                title={$t.homePageBtnTitleGetStarted}
                icon={<MdPersonAdd className="icon" />}
                cta
                onClick={handleToggleMenu}
              />
            )}
          </header>

          {/* Main content */}

          <main className="h-[calc(100vh-64px)] overflow-hidden bg-white flex dark:bg-inherit">
            {/* Aside main menu */}

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
                    areaLabel="Theme toggled"
                    to="/settings"
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
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                      18, 19, 20,
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

            {/* Page Content */}

            <section className="scrollbar w-full animation relative overflow-y-auto">
              <div
                className={`fixed w-full h-full bg-zinc-100/80 dark:bg-zinc-700/80 animation tablet:hidden ${
                  open ? "visible opacity-100" : "invisible opacity-0"
                }`}
                onClick={handleToggleMenu}
              ></div>
              <div className="p-3">{content ?? <Outlet />}</div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
