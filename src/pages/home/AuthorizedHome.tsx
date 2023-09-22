import { FC } from "react";

// Shared

import { useTranslations } from "@/shared/hooks";

// Icons

const Home: FC = () => {
  // Use

  const { $t } = useTranslations();

  return (
    <>
      <h1 className="text-xl mb-4">{$t.homePageTitle}</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
        consectetur asperiores quos nulla voluptates nisi recusandae, labore
        harum numquam nam, dicta odit laboriosam incidunt aliquam vitae. Esse
        sed quam ipsam.
      </p>
    </>
  );
};

export default Home;
