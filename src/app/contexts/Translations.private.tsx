import { createContext, useState, FC, useEffect } from "react";

// Shared

import {
  watchCollection,
  type Translation,
  type Locales,
} from "@/shared/firebase";
import { TRANSLATIONS_DENONA } from "@/shared/constants/index";

type ObjectKeyValue = {
  [key: string]: string;
};

type State = {
  $t: ObjectKeyValue;
  result: Translation[];
  translationsLoaded: boolean;
  changeLanguage: () => void;
};

export const TranslationsContext = createContext<State | undefined>(undefined);

export const TranslationsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [$t, setTranslations] = useState<ObjectKeyValue>({});
  const [result, setResult] = useState<Translation[]>([]);
  const [translationsLoaded, setTranslationsLoaded] = useState<boolean>(false);

  const getTranslationsByLocale = (list: Translation[]): ObjectKeyValue => {
    const localStorageLocale: Locales = (localStorage?.getItem("locale") ||
      "en") as Locales;
    return list.reduce(
      (acc: ObjectKeyValue, item: Translation): ObjectKeyValue => {
        acc[item.id] = item[localStorageLocale] || "XXXXX";
        return acc;
      },
      {}
    );
  };

  const changeLanguage = () => {
    setTranslations(() => getTranslationsByLocale(result));
  };

  useEffect(() => {
    const unsubscribe = watchCollection(
      TRANSLATIONS_DENONA,
      (items: Translation[]) => {
        setResult(() => items);
        setTranslations(() => getTranslationsByLocale(items));
        setTranslationsLoaded(true);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const state: State = {
    $t,
    result,
    translationsLoaded,
    changeLanguage,
  };

  return (
    <TranslationsContext.Provider value={state}>
      {children}
    </TranslationsContext.Provider>
  );
};
