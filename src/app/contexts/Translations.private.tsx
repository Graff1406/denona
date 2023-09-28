import { createContext, useState, FC, useEffect, ReactNode } from "react";

// Entities

import { indexDB } from "@/entities/indexDB";
import {
  watchCollection,
  type Translation,
  type Locales,
} from "@/entities/firebase";

// Shared

import { TRANSLATIONS_DENONA } from "@/shared/constants";

type ObjectKeyValue = {
  [key: string]: string;
};

type State = {
  $t: ObjectKeyValue;
  result: Translation[];
  loadingTranslations: boolean;
  changeLanguage: () => void;
};

const getLocaleFormLS = (): Locales =>
  (localStorage?.getItem("locale") || "en") as Locales;

document.documentElement.lang = getLocaleFormLS();

export const TranslationsContext = createContext<State | undefined>(undefined);

export const TranslationsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [$t, setTranslations] = useState<ObjectKeyValue>({});
  const [result, setResult] = useState<Translation[]>([]);
  const [loadingTranslations, setLoadingTranslations] = useState<boolean>(true);

  const getTranslationsByLocale = (list: Translation[]): ObjectKeyValue => {
    const localStorageLocale = getLocaleFormLS();
    return list.reduce(
      (acc: ObjectKeyValue, item: Translation): ObjectKeyValue => {
        acc[item.id] = item[localStorageLocale] || "XXXXX";
        return acc;
      },
      {}
    );
  };

  const changeLanguage = () => {
    setTranslations(getTranslationsByLocale(result));
  };

  const getTranslationsFromIndexDB = async (): Promise<{
    translations: ObjectKeyValue;
    items: Translation[];
    stringified: string;
  }> => {
    const { items } = (await indexDB.translations.get(1)) as {
      id: number;
      items: Translation[];
    };

    const translations = getTranslationsByLocale(items);
    return {
      translations,
      items,
      stringified: JSON.stringify(translations),
    };
  };

  const addDataToState = (
    items: Translation[],
    translations: ObjectKeyValue
  ) => {
    setResult(items);
    setTranslations(translations);
    setLoadingTranslations(false);
  };

  useEffect(() => {
    let indexDBData = {} as {
      translations: ObjectKeyValue;
      stringified: string;
    };
    getTranslationsFromIndexDB().then((data) => {
      if (data) {
        indexDBData = data;
        addDataToState(data.items, data.translations);
      }
    });

    const unsubscribe = watchCollection(
      TRANSLATIONS_DENONA,
      (items: Translation[]) => {
        const translations = getTranslationsByLocale(items);
        const toStringTranslations = JSON.stringify(translations);

        if (!indexDBData.stringified && toStringTranslations) {
          indexDB.translations.add({ items });
          addDataToState(items, translations);
        } else if (
          indexDBData.stringified !== toStringTranslations &&
          items?.length &&
          indexDBData.stringified
        ) {
          indexDB.translations.put({ id: 1, items });
          addDataToState(items, translations);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const state: State = {
    $t,
    result,
    loadingTranslations,
    changeLanguage,
  };

  return (
    <TranslationsContext.Provider value={state}>
      {children}
    </TranslationsContext.Provider>
  );
};
