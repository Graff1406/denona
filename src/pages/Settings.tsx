import { FC } from "react";
import { Helmet } from "react-helmet-async";

// Shared

import { useTranslations, useOnlineStatus } from "@/shared/hooks";

const Settings: FC = () => {
  // Use

  const { $t } = useTranslations();
  const { appIsOnline } = useOnlineStatus();

  return (
    <>
      <Helmet>
        <title>
          {appIsOnline ? $t.homePageTitle : $t.appNoInternetConnection}
        </title>
        <meta name="description" content={$t.homePageDescription} />
      </Helmet>
      {/* <h1 className="text-xl mb-4">{$t.homePageTitle}</h1>
      <br />
      {Array.from({ length: 12 }, (_v: undefined, i: number) => (
        <p key={i}>{$t.homePageDescription}</p>
      ))} */}
    </>
  );
};

export default Settings;
