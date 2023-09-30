import { FC } from "react";

// Features

import { WelcomeAuthorizedUser } from "@/widgets/banners";
import { useUserStore } from "@/features/auth";

// Shared

import { useTranslations } from "@/shared/hooks";

// Icons

const Home: FC = () => {
  // Use

  const { user } = useUserStore();
  const { $t } = useTranslations();

  return (
    <>
      {!user.auth?.hide?.banner?.welcomeAuthorizedUser && (
        <WelcomeAuthorizedUser />
      )}
      <div className="mt-6">
        <p className="text-center">{$t.appAuthUserHomePageNoExisitContent}</p>
      </div>
    </>
  );
};

export default Home;
