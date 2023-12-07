import React, { useState, useRef, useEffect } from "react";

// Icon
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface DeDropdownButtonProps {
  icon?: React.ReactNode;
  small?: boolean;
  loading?: boolean;
  buttonTitle: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const DeDropdownButton: React.FC<DeDropdownButtonProps> = ({
  icon,
  small,
  loading,
  buttonTitle,
  options,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownOptionsRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (selectedOption: string) => {
    onSelect(selectedOption);
    setIsDropdownOpen(false);
  };

  const handleBlur = (event: React.FocusEvent) => {
    const clickedElement = event.relatedTarget as HTMLElement;

    if (
      !dropdownButtonRef.current?.contains(clickedElement) &&
      !dropdownOptionsRef.current?.contains(clickedElement)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      dropdownOptionsRef.current?.focus();
    }
  }, [isDropdownOpen]);

  return (
    <div
      className={["relative inline-block text-left"].join(" ")}
      onBlur={handleBlur}
    >
      <div
        className={[
          "absolute rounded z-10 inset-0 bg-zinc-100 dark:bg-zinc-500 flex items-center justify-center opacity-80 animation",
          loading ? "visible" : "invisible",
        ].join(" ")}
      >
        <AiOutlineLoading3Quarters className="animate-spin text-gray-700" />
      </div>
      <button
        ref={dropdownButtonRef}
        type="button"
        className={[
          "inline-flex justify-between items-center dark:text-zinc-400 focus:outline-none border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 animation rounded",
          small ? "text-sm  py-1 px-2" : "py-2 px-3",
        ].join(" ")}
        onClick={handleButtonClick}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span className={["mr-2"].join(" ")}>{buttonTitle}</span>
        <IoIosArrowDown
          className={[
            "animation text-zinc-500 dark:text-zinc-400",
            isDropdownOpen ? "rotate-180" : "",
            small ? "w-5 h-5" : "w-6 h-6",
          ].join(" ")}
        />
      </button>

      <div
        ref={dropdownOptionsRef}
        tabIndex={-1}
        className={[
          "origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 ring-1 ring-black ring-opacity-5 animation transform z-10 scrollbar dark:scrollbar-dark max-h-40 overflow-y-auto",
          isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0",
        ].join(" ")}
      >
        <div className={["py-1"].join(" ")}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={[
                "block px-4 py-2 text-sm  w-full text-left",
                buttonTitle === option
                  ? "bg-blue-50 dark:bg-zinc-900"
                  : "dark:text-zinc-400 dark:hover:bg-zinc-900 hover:bg-zinc-100",
              ].join(" ")}
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
