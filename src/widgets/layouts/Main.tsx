import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

// Icons

import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

// Shared

import { ZnIconButton, ZnButton } from "@/shared/ui";
import { signOut } from "@/shared/firebase/auth/public";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/public";

// Features

import SwitchThemeColor from "@/features/SwitchThemeColor";
import { resetUser, type UserState } from "@/features/auth/public";

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

  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // State

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [spinnerLogout, setSpinnerLogout] = useState(false);

  // methods

  const handleToggleMenu = () => onToggleMenu(() => setOpen(!open));
  const handleLogout = async () => {
    setSpinnerLogout(() => true);
    await signOut();
    dispatch(resetUser());
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
                alt="Logo of Denona"
                width={32}
                height={32}
              />
              <span className="uppercase font-medium text-xl dark:text-zinc-200">
                Denona
              </span>
              <SwitchThemeColor />
            </div>
            {headerRight ?? (
              <ZnIconButton
                icon={
                  open ? (
                    <IoMdClose className="icon" />
                  ) : (
                    <BiMenu className="icon" />
                  )
                }
                areaLabel="Toggle menu"
                onClick={handleToggleMenu}
              />
            )}
          </header>

          <main className="flex" aria-label="Main Content">
            <aside
              className={`scrollbar border-r dark:border-r-zinc-700 overflow-y-auto tablet:w-1/2 h-content transition-all duration-300 tablet:opacity-100 ${
                open
                  ? "min-w-[320px] w-full opacity-100"
                  : "w-0 min-w-0 opacity-0 overflow-hidden"
              }`}
              role="complementary"
              aria-label="Sidebar Navigation"
            >
              <nav className="box-border space" role="navigation">
                {aside}
                {user.auth && (
                  <ZnButton
                    className="w-full flex justify-center mt-2"
                    label="Logout"
                    areaLabel="Logout button"
                    cta
                    loading={spinnerLogout}
                    onClick={handleLogout}
                  />
                )}
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
