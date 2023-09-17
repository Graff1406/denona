import { FC } from "react";

// Shared

import { useTranslations } from "@/shared/hooks";

const Settings: FC = () => {
  // Use

  const { $t } = useTranslations();

  return (
    <>
      <h1>{$t.settingsPageTitle}</h1>
      {/* <h1 className="text-xl mb-4">{$t.homePageTitle}</h1>
      <br />
      {Array.from({ length: 12 }, (_v: undefined, i: number) => (
        <p key={i}>{$t.homePageDescription}</p>
      ))} */}
    </>
  );
};

export default Settings;
