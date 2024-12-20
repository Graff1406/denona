import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

// Features

import { useUserStore } from "@/features/auth";

// Shared

import { DeIconButton, DeButton, DeImage } from "@/shared/ui";
import { useTranslations, useAccessiblePages } from "@/shared/hooks";
import { path } from "@/shared/constants";

// Icons

import {
  MdPersonAdd,
  MdMenu,
  MdArrowBackIosNew,
  MdOutlineAddTask,
} from "react-icons/md";

interface Props {
  open: boolean;
  isHomePage: boolean;
  title: string;
  onToggleMenu: () => void;
}

const Header: FC<Props> = ({ open, title, isHomePage, onToggleMenu }) => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();
  const navigate = useNavigate();
  const { accessiblePages } = useAccessiblePages();

  // methods

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header
      className="border-b dark:border-b-zinc-700 flex justify-between items-center space h-16 overflow-hidden"
      role="banner"
    >
      <div className="flex gap-1 truncate text-ellipsis overflow-hidden">
        {/* Logo */}
        <Link
          to={path.home}
          className={`flex items-center gap-4 min-w-max ${
            !isHomePage ? "hidden tablet:flex" : ""
          }`}
          aria-label={$t.logoImgAltText}
          role="link"
        >
          <DeImage
            lazy={false}
            src="/images/favicon.ico"
            alt={$t.logoImgAltText}
            className="w-8 h-8"
          />
          <span className="uppercase font-medium text-xl tablet:block dark:text-zinc-200">
            {$t.mainLogo}
          </span>
        </Link>

        {/* Arrow back, Page title */}
        <div
          className={`flex grow items-center max-w-max gap-1 tablet:border-l tablet:border-l-zinc-200 dark:tablet:border-l dark:tablet:border-l-zinc-700 tablet:mx-6 tablet:pl-2 tablet:animation ${
            accessiblePages ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <DeIconButton
            icon={<MdArrowBackIosNew className="h-6 w-6" />}
            areaLabel={$t.appBackArrowLabel}
            onClick={goBack}
          />
          <h1 className="text-lg">{title}</h1>
        </div>
      </div>

      {/* Right btn */}

      {user.auth ? (
        <>
          <DeIconButton
            className="tablet:hidden"
            icon={<MdMenu className="icon" />}
            areaLabel={$t.homePageMainBtnMobileMenuToggle}
            onClick={onToggleMenu}
            ariaExpanded={open}
            id="menu-toggle"
            aria-controls="menu"
          />
          {path.create !== location.pathname && (
            <Link to={path.create} className="hidden tablet:block">
              <DeButton
                label={$t.appFormCreateTaskLabel}
                areaLabel={$t.appFormCreateTaskAreaLabel}
                icon={<MdOutlineAddTask className="icon" />}
                cta
              />
            </Link>
          )}
        </>
      ) : (
        <DeButton
          className="tablet:hidden"
          label={$t.homePageBtnGetStarted}
          areaLabel={$t.homePageBtnAreaLabelGetStarted}
          icon={<MdPersonAdd className="icon" />}
          cta
          onClick={onToggleMenu}
        />
      )}
    </header>
  );
};

export default Header;
