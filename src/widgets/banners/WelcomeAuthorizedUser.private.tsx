import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
        <h2 className="text-base tablet:text-lg flex justify-center gap-1">
          <span>{$t.appUserWelcome}, </span>
          <span className="font-semibold">{user.auth?.displayName}.</span>
        </h2>
      }
      onChange={saveDontShowAgain}
    >
      <div className="space-y-3">
        <p>
          Мы рады приветствовать вас на нашем сервисе, который способствует
          созданию и следованию правил и алгоритмов для эффективной жизни.
        </p>
        <p>
          Наши инструменты помогут вам увеличить эффективность, достигать целей
          и жить более счастливой жизнью.
        </p>

        <div>
          <h3 className="font-semibold">
            Некоторые функции которые вам уже доступны:
          </h3>

          <ul>
            <li>
              <NavLink to="/help#section-1" className="link">
                Запоминайте последовательность действий.
              </NavLink>
            </li>
            <li>
              <NavLink to="/help#section-2" className="link">
                Организовывайте свои задачи.
              </NavLink>
            </li>
            <li>
              <NavLink to="/help#section-3" className="link">
                Мотивируйтесь к действию.
              </NavLink>
            </li>
          </ul>
        </div>

        <p className="inline-block mr-1">
          Хотите узнать больше о функционале{" "}
          <span className="uppercase font-semibold">Denona</span>? Посетите нашу
        </p>
        <Link to="/help" className="link space-x-1">
          страницу Help/FAQ.
        </Link>
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
