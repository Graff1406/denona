import { ChangeEvent } from "react";

// Shared

import { createRandomId } from "@/shared/helpers";

interface FieldProps {
  title: string;
  value: string;
  placeholder?: string;
  id?: string;
  type?: "text" | "number" | "email" | "password";
  ariaLabel?: string;
  name?: string;
  className?: string;
  hint?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DeField: React.FC<FieldProps> = ({
  id = createRandomId(),
  type = "text",
  placeholder,
  name,
  title,
  value,
  ariaLabel,
  className,
  hint,
  errorMessage,
  disabled,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className="w-full">
      <input
        className={`border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 px-4 py-3 w-full rounded-md ${className}`}
        id={id}
        type={type}
        title={title || placeholder}
        name={name}
        value={value}
        aria-label={ariaLabel || title || placeholder}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
      />
      <p
        className={`text-left text-sm pl-5 animation ${
          errorMessage ? "text-red-400" : "text-zinc-400"
        }`}
      >
        {errorMessage || hint}
      </p>
    </div>
  );
};

export default DeField;
