import { createContext, useState, FC, useEffect } from "react";

// Shared

import {
  watchCollection,
  type Translation,
  type Locales,
} from "@/shared/firebase";
import { TRANSLATIONS_DENONA } from "@/shared/constants/index";

const localStorageLocale: Locales = (localStorage.getItem("locale") ||
  "en") as Locales;

type ObjectKeyValue = {
  [key: string]: string;
};

type State = {
  $t: ObjectKeyValue;
};

export const TranslationsContext = createContext<State | undefined>(undefined);

export const TranslationsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [$t, setTranslations] = useState<ObjectKeyValue>({});
  // const [locale, setLocale] = useState<Locales>(localStorageLocale);

  const getTranslationsByLocale = (list: Translation[]) =>
    list.reduce((acc: ObjectKeyValue, item: Translation) => {
      acc[item.id] = item[localStorageLocale] || "XXXXX";
      return acc;
    }, {});

  useEffect(() => {
    const unsubscribe = watchCollection(
      TRANSLATIONS_DENONA,
      (items: Translation[]) => {
        setTranslations(() => getTranslationsByLocale(items));
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const state: State = {
    $t,
  };

  return (
    <TranslationsContext.Provider value={state}>
      {children}
    </TranslationsContext.Provider>
  );
};
