import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

// Icons

import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";

// Features

import { SwitchLanguage, SwitchThemeColor } from "@/features/theme";
import { useUserStore } from "@/features/auth";

// Shared

import { DnIconButton } from "@/shared/ui";
import { signOut } from "@/shared/firebase";
import { useTranslations } from "@/shared/hooks";

interface Props {
  aside: ReactElement;
  content: ReactElement;
  title: string;
  description: string;
  headerRight?: ReactElement;
  isToggleMenu?: boolean;
  onToggleMenu?: (callback: () => void) => void;
}

const MainLayout: FC<Props> = ({
  headerRight,
  aside,
  content,
  title,
  description,
  isToggleMenu,
  onToggleMenu = (callback) => callback(),
}): ReactElement => {
  // Use

  const { user, dispatchResetUser } = useUserStore();
  const { $t } = useTranslations();

  // State

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [spinnerLogout, setSpinnerLogout] = useState(false);

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

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="tablet:flex tablet:flex-col w-full tablet:justify-center tablet:items-center dark:bg-zinc-900 dark:text-zinc-400 transition-all">
        <div className="relative max-w-[900px] flex-grow overflow-hidden tablet:border-x bg-white dark:bg-zinc-800 dark:border-zinc-700 h-screen">
          <header
            className="border-b dark:border-b-zinc-700 flex justify-between items-center space h-16"
            role="banner"
          >
            <div className="flex items-center gap-4">
              <img
                src="/images/favicon.ico"
                alt={$t.logoImgAltText}
                width={32}
                height={32}
              />
              <span className="uppercase font-medium text-xl dark:text-zinc-200">
                {$t.mainLogo}
              </span>
            </div>
            {headerRight ?? (
              <DnIconButton
                icon={
                  open ? (
                    <IoMdClose className="icon" />
                  ) : (
                    <BiMenu className="icon" />
                  )
                }
                areaLabel={$t.toggleMenuBtnAreaLabel}
                onClick={handleToggleMenu}
              />
            )}
          </header>

          <main className="flex" aria-label={$t.mainContentAreaLabel}>
            <aside
              className={`scrollbar border-r dark:border-r-zinc-700 overflow-y-auto tablet:w-1/2 h-content transition-all duration-300 tablet:opacity-100 ${
                open
                  ? "min-w-[320px] w-full opacity-100"
                  : "w-0 min-w-0 opacity-0 overflow-hidden"
              }`}
              role="complementary"
              aria-label={$t.sidebarNavigationAreaLabel}
            >
              <div className="flex items-center justify-between px-3 py-2 border-0 border-b border-b-zinc-200 dark:border-b-zinc-700">
                <SwitchLanguage />
                <div className="flex gap-2">
                  <SwitchThemeColor />
                  {user.auth && (
                    // <DnButton
                    //   label="Logout"
                    //   icon={<AiOutlineLogout />}
                    //   areaLabel={$t.logoutButtonAreaLabel}
                    //   loading={spinnerLogout}
                    //   onClick={handleLogout}
                    // />
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
              <nav className="box-border space" role="navigation">
                {aside}
              </nav>
            </aside>
            <section className="relative w-full">
              <div
                className={`absolute inset-0 z-10 bg-zinc-100/80 dark:bg-zinc-700/80 transition-all duration-300 tablet:hidden ${
                  open ? "visible opacity-100" : "invisible opacity-0"
                }`}
                onClick={handleToggleMenu}
              ></div>
              <div
                className={`scrollbar h-content w-full space ${
                  open
                    ? "overflow-hidden tablet:overflow-y-auto"
                    : "overflow-y-auto"
                }`}
              >
                {content}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;