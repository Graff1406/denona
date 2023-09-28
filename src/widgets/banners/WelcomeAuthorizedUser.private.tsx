import { FC, useState } from "react";

// Features

import { useUserStore } from "@/features/auth";

// Entities

import { updateDocument, getDocumentById } from "@/entities/firebase";

// Entities

import { indexDB } from "@/entities/indexDB";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeBanner } from "@/shared/ui";
import { USERS } from "@/shared/constants";
import { StringToHTML } from "@/shared/helpers";

// Component

import { DnButton } from "@/shared/ui";

const WelcomeAuthorizedUser: FC = () => {
  // Use

  const { $t } = useTranslations();
  const { user } = useUserStore();

  // State

  const [bannerVisible, setBannerVisible] = useState(true);

  const hideBanner = () => {
    setBannerVisible(false);
  };

  const saveDontShowAgain = async (checked: boolean) => {
    if (user.auth?.uid && checked) {
      await updateDocument(USERS, user.auth?.uid, {
        "hide.banner.welcomeAuthorizedUser": true,
      });

      const userFromServer = await getDocumentById(USERS, user.auth.uid);
      if (userFromServer) indexDB.user.put({ id: 1, user: userFromServer });
    }
  };

  if (!bannerVisible) {
    return null;
  }

  return (
    <DeBanner
      header={
        <h2 className="font-normal flex justify-center gap-1">
          <span>{$t.appUserWelcome}, </span>
          <span className="font-semibold">{user.auth?.displayName}.</span>
        </h2>
      }
      onChange={saveDontShowAgain}
    >
      <div className="space-y-3">
        <StringToHTML htmlString={$t.bannerContentWelcomeAuthorizedUser} />
        {/* <div>{StringToHTML($t.bannerContentWelcomeAuthorizedUser)}</div> */}
        {/* <div>{$t.bannerContentWelcomeAuthorizedUser}</div> */}
        <div className="pt-2 flex justify-center">
          <DnButton
            label={$t.appFormCreateTaskLabel}
            areaLabel={$t.appFormCreateTaskAreaLabel}
            cta
            onClick={hideBanner}
          />
        </div>
      </div>
    </DeBanner>
  );
};

export default WelcomeAuthorizedUser;
