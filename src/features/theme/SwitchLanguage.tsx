import { FC, useState } from "react";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeRadio } from "@/shared/ui";
import { useLocale, Language, Locales, languages } from "@/shared/hooks";

const SwitchLanguage: FC = () => {
  // Use

  const { changeLanguage } = useTranslations();
  const { locale, changeLocale } = useLocale();

  // State

  const [selectedLanguage, setSelectedLanguage] = useState(locale.code);

  const handleLanguageSelect = (code: Locales) => {
    changeLocale(code);
    setSelectedLanguage(code);
    changeLanguage();
  };

  return (
    <fieldset className="p-3 flex flex-col items-end space-y-3">
      {languages.map((language: Language, i: number) => (
        <DeRadio
          key={i}
          label={language.label}
          ariaLabel={language.label}
          value={language.code}
          checked={selectedLanguage === language.code}
          onChange={() => handleLanguageSelect(language.code)}
        />
      ))}
    </fieldset>
  );
};

export default SwitchLanguage;
