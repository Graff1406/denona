import { ZnButton } from "@/shared/ui";
import { FC, useState } from "react";
import { type Locales } from "@/shared/firebase";
import { useTranslations } from "@/shared/hooks";

const languages: Locales[] = ["en", "de", "ka", "ua", "ru"];

const SwitchLanguage: FC = () => {
  // Use

  const { changeLanguage } = useTranslations();
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("locale") || ""
  );

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleLanguageSelect = (code: Locales) => {
    localStorage.setItem("locale", code);
    setSelectedLanguage(code);
    changeLanguage();
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <ZnButton
          className="w-9 justify-center"
          label={selectedLanguage.toUpperCase()}
          onClick={toggleDropdown}
        />
      </div>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 min-w-min rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 w-full"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {languages
              .filter((loc: Locales) => selectedLanguage !== loc)
              .map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageSelect(language)}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {language.toUpperCase()}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SwitchLanguage;
