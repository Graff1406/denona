import React, { useState } from "react";

interface SwitchProps {
  id?: string;
  onChange: (checked: boolean) => void;
  label?: string;
  active?: boolean;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  id,
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

  const localId = id || `switch-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <div className={`flex items-center justify-end ${className}`}>
      {label && (
        <span
          id={`${localId}-label`}
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
        id={localId}
        className="sr-only"
        checked={checked}
        onChange={handleChange}
        aria-labelledby={`${localId}-label`}
        aria-checked={checked}
      />
      <label
        htmlFor={localId}
        className={`relative inline-block w-10 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
          checked ? "bg-blue-200" : "bg-zinc-300"
        }`}
        role="switch"
        aria-labelledby={`${localId}-label`}
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
