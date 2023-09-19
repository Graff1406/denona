import { useState } from "react";

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
    setChecked(() => !checked);
    onChange(!checked);
  };

  const localId = id || Math.random().toString().substring(5, 10);

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={localId}
        className="sr-only"
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={localId}
        className={`relative inline-block w-10 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
          checked ? "bg-blue-200" : "bg-zinc-300"
        }`}
      >
        <span
          className={`${
            checked ? "translate-x-4 bg-blue-500" : "translate-x-0 bg-zinc-200"
          } absolute inset-y-0 left-0 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
        ></span>
      </label>
      {label && (
        <span
          className="text-gray-700 dark:text-gray-300 pl-2 cursor-pointer"
          onClick={handleChange}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Switch;
