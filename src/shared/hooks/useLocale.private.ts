import { useEffect } from "react";

export type Locales = "en" | "de" | "ka" | "ua" | "ru";

export type Language = { label: string; code: Locales; enLabel: string };

export const languages: Language[] = [
  {
    label: "English",
    code: "en",
    enLabel: "English",
  },
  { label: "Deutsch", code: "de", enLabel: "German" },
  { label: "ქართული", code: "ka", enLabel: "Georgian" },
  { label: "Український", code: "ua", enLabel: "Ukrainian" },
  { label: "Русский", code: "ru", enLabel: "Russian" },
];
let locale: Language = languages[0];

function useLocale(): {
  locale: Language;
  changeLocale: (loc: Locales) => void;
} {
  const changeLocale = (loc: Locales) => {
    const language = languages.find((lang: Language) => lang.code === loc);
    if (language) {
      locale = language;
    }
  };

  useEffect(() => {
    try {
      const language = localStorage.getItem("locale") as Locales;
      if (language) changeLocale(language);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return { locale, changeLocale };
}

export default useLocale;
