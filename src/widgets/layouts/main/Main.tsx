import { FC, ReactElement, useState, useEffect, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";

// Features

import { useUserStore } from "@/features/auth";

// Shared

import { signOut } from "@/shared/firebase";
import { useTranslations, useOnlineStatus } from "@/shared/hooks";

// Helpers

import { getCurrentRouteData } from "../helpers";

// Components

const Header = lazy(() => import("./Header.private"));
const Aside = lazy(() => import("./Aside.private"));

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

  const { dispatchResetUser } = useUserStore();
  const { $t } = useTranslations();
  const { appIsOnline } = useOnlineStatus();
  const location = useLocation();

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

          <Header
            isHomePage={isHomePage}
            headerRight={headerRight}
            title={title}
            onToggleMenu={onToggleMenu}
          />

          {/* Main content */}

          <main className="h-[calc(100vh-64px)] overflow-hidden bg-white flex dark:bg-inherit">
            {/* Aside main menu */}

            <Aside
              open={open}
              spinnerLogout={spinnerLogout}
              aside={aside}
              handleLogout={handleLogout}
            />

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
