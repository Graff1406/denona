import { FC, useState } from "react";

// Widget

import { MainLayout } from "@/widgets/layouts";

// Features

import { useUserStore } from "@/features/auth";

// Shared

import { ZnButton, ZnIconButton } from "@/shared/ui";
import { signInGoogleWithPopup } from "@/shared/firebase";
import { useTranslations } from "@/shared/hooks";

// Icons

import { FcGoogle } from "react-icons/fc";
import { MdPersonAdd, MdMenu } from "react-icons/md";

const Home: FC = () => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();

  // State

  const [openMenu, setOpenMenu] = useState(false);

  // Methods

  const onToggleMenu = () => setOpenMenu(!openMenu);
  const onAuthByGoogle = () => {
    signInGoogleWithPopup();
  };

  return (
    <MainLayout
      aside={
        user.auth ? (
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
            <ZnButton
              label={$t.homePageBtnLabelSignInWithGoogle}
              areaLabel={$t.homePageBtnAreaLabelSignInWithGoogle}
              title={$t.homePageBtnTitleSignInWithGoogle}
              icon={<FcGoogle className="icon" />}
              onClick={onAuthByGoogle}
            />
          </div>
        )
      }
      content={
        <>
          <h1 className="text-xl mb-4">{$t.homePageTitle}</h1>
          <br />
          {Array.from({ length: 12 }, (v: undefined, i: number) => (
            <p key={i}>{$t.homePageDescription}</p>
          ))}
        </>
      }
      headerRight={
        user.auth ? (
          <ZnIconButton
            className="tablet:hidden"
            icon={<MdMenu className="icon" />}
            areaLabel={$t.homePageMainBtnMobileMenuToggle}
            onClick={onToggleMenu}
          />
        ) : (
          <ZnButton
            className="tablet:hidden"
            label={$t.homePageBtnGetStarted}
            areaLabel={$t.homePageBtnAreaLabelGetStarted}
            title={$t.homePageBtnTitleGetStarted}
            icon={<MdPersonAdd className="icon" />}
            cta
            onClick={onToggleMenu}
          />
        )
      }
      title={$t.homePageTitle}
      description={$t.homePageDescription}
      isToggleMenu={openMenu}
    />
  );
};

export default Home;
