import React, { useState } from "react";

// Icon

import { IoIosArrowDown } from "react-icons/io";

interface DeDropdownButtonProps {
  icon?: React.ReactNode;
  buttonTitle: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const DeDropdownButton: React.FC<DeDropdownButtonProps> = ({
  icon,
  buttonTitle,
  options,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (selectedOption: string) => {
    onSelect(selectedOption);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-between items-center py-2 px-3 dark:text-zinc-400 focus:outline-none border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 animation rounded"
        onClick={handleButtonClick}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span className="mr-2">{buttonTitle}</span>
        <IoIosArrowDown
          className={`w-6 h-6 animation text-zinc-500 dark:text-zinc-400 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={[
          "origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 ring-1 ring-black ring-opacity-5 animation transform",
          isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0",
        ].join(" ")}
      >
        <div className="py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className="block px-4 py-2 text-sm dark:text-zinc-400 dark:hover:bg-zinc-900 hover:bg-zinc-100 w-full text-left"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeDropdownButton;
