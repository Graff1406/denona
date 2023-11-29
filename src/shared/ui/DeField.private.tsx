import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

// Shared

import { createRandomId } from "@/shared/helpers";

// Icons

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface FieldProps {
  value: string;
  placeholder: string;
  title?: string;
  id?: string;
  type?: "text" | "number" | "email" | "password";
  ariaLabel?: string;
  name?: string;
  className?: string;
  hint?: string;
  errorMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
  loading,
  onChange,
  onBlur,
  onEnter,
}) => {
  // methods

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onEnter) {
      onEnter(event);
    }
  };

  return (
    <div className="w-full">
      <div
        className={[
          "relative border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 w-full rounded-md",
          className,
        ].join(" ")}
      >
        <input
          className={[
            "w-full dark:bg-zinc-900 px-4 py-3 rounded-md",
            disabled ? "bg-zinc-200 dark:bg-zinc-700" : "",
          ].join(" ")}
          id={id}
          type={type}
          title={title || placeholder}
          name={name}
          value={value}
          aria-label={ariaLabel || title || placeholder}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onBlur={onBlur}
          onKeyUp={handleKeyUp}
        />
        <div
          className={[
            "absolute top-0 bottom-0 w-full flex justify-end items-center pr-5",
            loading ? "visible z-10" : "invisible -z-10",
          ].join(" ")}
        >
          <AiOutlineLoading3Quarters
            className={["animate-spin w-5 h-5 animation"].join(" ")}
          />
        </div>
      </div>
      <p
        className={`text-left text-xs tablet:text-sm pl-5 animation ${
          errorMessage ? "text-red-400 animate-bounce-once" : "text-zinc-400"
        }`}
      >
        {errorMessage || hint}
      </p>
    </div>
  );
};

export default DeField;
