import { FC, useState, useRef } from "react";

// Shared

import { type Locales } from "@/shared/firebase";
import { useTranslations, useClickOutside } from "@/shared/hooks";
import { DnButton, DeMenu } from "@/shared/ui";

const languages: Locales[] = ["en", "de", "ka", "ua", "ru"];

const SwitchLanguage: FC = () => {
  // Use

  const { $t, changeLanguage } = useTranslations();

  // State

  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("locale") || "en"
  );

  // Ref

  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleLanguageSelect = (code: Locales) => {
    localStorage.setItem("locale", code);
    setSelectedLanguage(code);
    changeLanguage();
    setOpen(false);
  };

  useClickOutside(ref, toggleDropdown);

  return (
    <DeMenu
      closeOnContent
      activator={
        <DnButton
          className="w-9 justify-center"
          label={selectedLanguage.toUpperCase()}
          title={$t.changeLanguageBtnTitle}
          areaLabel={$t.changeLanguageBtnAreaLabel}
          onClick={toggleDropdown}
        />
      }
    >
      {languages
        .filter((loc: Locales) => selectedLanguage !== loc)
        .map((language) => (
          <button
            key={language}
            onClick={() => handleLanguageSelect(language)}
            className="block w-full px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-zinc-900 dark:dark:text-zinc-400"
            role="menuitem"
            area-label={language}
            title={language}
          >
            {language.toUpperCase()}
          </button>
        ))}
    </DeMenu>
  );
};

export default SwitchLanguage;
