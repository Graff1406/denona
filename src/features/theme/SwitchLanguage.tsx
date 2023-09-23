import { FC, useState, useRef } from "react";

// Entities

import { type Locales } from "@/entities/firebase";

// Shared

import { useTranslations, useClickOutside } from "@/shared/hooks";
import { DeRadio } from "@/shared/ui";

type Language = { label: string; code: Locales };

const languages: Language[] = [
  { label: "English", code: "en" },
  { label: "Deutsch", code: "de" },
  { label: "ქართული", code: "ka" },
  { label: "Український", code: "ua" },
  { label: "Русский", code: "ru" },
];

const SwitchLanguage: FC = () => {
  // Use

  const { changeLanguage } = useTranslations();

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

  const handleLanguageSelect = (code: string) => {
    localStorage.setItem("locale", code);
    setSelectedLanguage(code);
    changeLanguage();
    setOpen(false);
  };

  useClickOutside(ref, toggleDropdown);

  return (
    <fieldset className="p-3 flex flex-col items-end space-y-3">
      {languages.map((language: Language, i: number) => (
        <DeRadio
          key={i}
          label={language.label}
          ariaLabel={language.label}
          value={language.code}
          checked={selectedLanguage === language.code}
          onChange={handleLanguageSelect}
        />
      ))}
    </fieldset>
  );
};

export default SwitchLanguage;
