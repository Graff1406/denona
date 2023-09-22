import { useEffect } from "react";

// Shared

import { createRandomId } from "@/shared/helpers";

interface RadioProps {
  label: string;
  value: string;
  checked: boolean;
  ariaLabel: string;
  id?: string;
  name?: string;
  onChange: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({
  id = createRandomId(),
  name,
  label,
  value,
  checked,
  ariaLabel,
  onChange,
}) => {
  const handleChange = () => {
    onChange(value);
  };

  useEffect(() => {
    if (checked) {
      handleChange();
    }
  }, [checked]);

  return (
    <label className="inline-flex items-center space-x-3 cursor-pointer">
      <span className=" text-zinc-700 dark:text-zinc-400">{label}</span>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="form-radio text-blue-500 focus:ring-zinc-800 focus:border-zinc-800 dark:bg-zinc-800 w-5 h-5"
        aria-label={ariaLabel || label}
      />
    </label>
  );
};

export default Radio;
