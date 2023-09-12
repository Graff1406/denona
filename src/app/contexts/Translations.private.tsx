import { createContext, useState, FC, useEffect } from "react";

// Shared

import { TRANSLATIONS_DENONA } from "@/shared/constants";
import { indexDB } from "@/shared/indexDB";
import {
  watchCollection,
  type Translation,
  type Locales,
} from "@/shared/firebase";

type ObjectKeyValue = {
  [key: string]: string;
};

type State = {
  $t: ObjectKeyValue;
  result: Translation[];
  translationsLoaded: boolean;
  changeLanguage: () => void;
};

const getLocaleFormLS = (): Locales =>
  (localStorage?.getItem("locale") || "en") as Locales;

document.documentElement.lang = getLocaleFormLS();

export const TranslationsContext = createContext<State | undefined>(undefined);

export const TranslationsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [$t, setTranslations] = useState<ObjectKeyValue>({});
  const [result, setResult] = useState<Translation[]>([]);
  const [translationsLoaded, setTranslationsLoaded] = useState<boolean>(false);

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
    setTranslations(() => getTranslationsByLocale(result));
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
    setResult(() => items);
    setTranslations(translations);
    setTranslationsLoaded(true);
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
        // console.log("getTranslationsFromIndexDB", Date.now());
      }
    });

    const unsubscribe = watchCollection(
      TRANSLATIONS_DENONA,
      (items: Translation[]) => {
        const translations = getTranslationsByLocale(items);
        const toStringTranslations = JSON.stringify(translations);
        // console.log(111, toStringTranslations);
        // console.log(222, indexDBData.stringified);
        // console.log(333, toStringTranslations === indexDBData.stringified);

        if (!indexDBData.stringified && toStringTranslations) {
          indexDB.translations.add({ items });
          addDataToState(items, translations);
          // console.log("if");
        } else if (
          indexDBData.stringified !== toStringTranslations &&
          items?.length &&
          indexDBData.stringified
        ) {
          indexDB.translations.put({ id: 1, items });
          addDataToState(items, translations);
          // console.log("else");
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
    translationsLoaded,
    changeLanguage,
  };

  return (
    <TranslationsContext.Provider value={state}>
      {children}
    </TranslationsContext.Provider>
  );
};
