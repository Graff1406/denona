import React, { useState } from "react";

// Shared

import { createRandomId } from "@/shared/helpers";

interface SwitchProps {
  id?: string;
  onChange: (checked: boolean) => void;
  label?: string;
  active?: boolean;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  id = createRandomId(),
  onChange,
  label,
  className,
  active,
}) => {
  // State
  const [checked, setChecked] = useState(!!active);

  // methods
  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className={`flex items-center justify-end ${className}`}>
      {label && (
        <span
          id={`${id}-label`}
          className="text-gray-700 dark:text-gray-300 pr-3 cursor-pointer"
          onClick={handleChange}
          role="label"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleChange();
            }
          }}
        >
          {label}
        </span>
      )}
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={checked}
        onChange={handleChange}
        aria-labelledby={`${id}-label`}
        aria-checked={checked}
      />
      <label
        htmlFor={id}
        className={`relative inline-block w-10 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
          checked ? "bg-blue-200" : "bg-zinc-300"
        }`}
        role="switch"
        aria-labelledby={`${id}-label`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleChange();
          }
        }}
      >
        <span
          className={`${
            checked ? "translate-x-4 bg-blue-500" : "translate-x-0 bg-zinc-200"
          } absolute inset-y-0 left-0 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
        ></span>
      </label>
    </div>
  );
};

export default Switch;
