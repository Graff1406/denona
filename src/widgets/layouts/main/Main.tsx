import { FC, ReactElement, useState, useEffect, useRef, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Features

import { useUserStore } from "@/features/auth";

// Entities

import { signOut } from "@/entities/firebase";

// Entities

import { indexDB } from "@/entities/indexDB";

// Shared

import {
  useTranslations,
  useOnlineStatus,
  useScrollDirection,
} from "@/shared/hooks";
import { path } from "@/shared/constants";

// Helpers

import { getCurrentRouteData } from "../helpers";
import { DnIconButton } from "@/shared/ui";

// Icons
import { MdOutlineAddTask } from "react-icons/md";

// Lazy Components

const Header = lazy(() => import("./Header.private"));
const Aside = lazy(() => import("./aside/Aside.private"));

const MainLayout: FC = (): ReactElement => {
  // Use

  const { dispatchResetUser, user } = useUserStore();
  const { $t } = useTranslations();
  const { appIsOnline } = useOnlineStatus();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollDirectionY = useScrollDirection();
  // State

  const [open, setOpen] = useState(false);
  const [spinnerLogout, setSpinnerLogout] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  // Get helper data
  const { title, head } = getCurrentRouteData(location.pathname, $t);

  // methods

  const handleToggleMenu = () => setOpen(!open);
  const handleLogout = async () => {
    setSpinnerLogout(true);
    await signOut();
    navigate(path.home);
    dispatchResetUser();
    indexDB.user.clear();
    setSpinnerLogout(false);
  };

  // Hooks

  useEffect(() => {
    // It have frozen main scroll
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  useEffect(() => {
    // If have changed route we have closed menu
    if (open) setOpen(false);

    // Define home route
    setIsHomePage(location.pathname === "/");
  }, [location]);

  useEffect(() => {
    if (user.auth) setOpen(false);
  }, [user.auth]);

  return (
    <>
      <Helmet>
        <title>{appIsOnline ? head.title : $t.appNoInternetConnection}</title>
        <meta name="description" content={head.description} />
      </Helmet>

      {/* Page container */}

      <div className="dark:bg-zinc-900 dark:text-zinc-400 transition-all">
        {/* Main Column */}

        <div className="h-screen flex-col grow mx-auto max-w-[900px] tablet:border-x dark:border-zinc-700 bg-white dark:bg-zinc-800">
          {/* Logo, Arrow back, Page Title, right btn */}

          <Header
            open={open}
            isHomePage={isHomePage}
            title={title}
            onToggleMenu={handleToggleMenu}
          />

          {/* Main content */}

          <main
            className={`overflow-hidden bg-white flex dark:bg-inherit ${
              appIsOnline ? "h-[calc(100vh-64px)]" : "h-[calc(100vh-88px)]"
            }`}
          >
            {/* Aside main menu */}

            <Aside
              open={open}
              spinnerLogout={spinnerLogout}
              onUserLogout={handleLogout}
            />

            {/* Page */}

            <section
              id="page-wrapper"
              className="scrollbar w-full animation relative overflow-y-auto"
            >
              {/* Block for show No internet connection */}

              <div
                className={`bg-zinc-700 text-white text-xs flex justify-center items-center leading-6 sticky top-0 animation ${
                  /* showTextForAppIsOffline */ appIsOnline
                    ? "h-0 opacity-0"
                    : "h-6 opacity-100"
                }`}
              >
                {$t.appNoInternetConnection}
              </div>

              {/* Overlay while menu have opened */}

              <div
                className={`fixed w-full h-full z-10 bg-zinc-100/80 dark:bg-zinc-900/80 animation tablet:hidden ${
                  open ? "visible opacity-100" : "invisible opacity-0"
                }`}
                onClick={handleToggleMenu}
              ></div>

              {/* Page content */}

              <div className="p-4 relative h-full">
                <Outlet />

                {path.create !== location.pathname && (
                  <DnIconButton
                    to={path.create}
                    className={[
                      "tablet:hidden fixed bottom-5 right-5 animation",
                      scrollDirectionY === "down"
                        ? "opacity-20"
                        : "opacity-100",
                    ].join(" ")}
                    icon={<MdOutlineAddTask className="icon" />}
                    areaLabel={$t.homePageMainBtnMobileMenuToggle}
                    ariaExpanded={open}
                    id="menu-toggle"
                    aria-controls="menu"
                    cta
                  />
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
