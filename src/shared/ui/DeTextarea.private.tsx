import { ChangeEvent, FocusEvent } from "react";

// Shared

import { createRandomId } from "@/shared/helpers";

interface TextareaProps {
  value: string;
  placeholder: string;
  title?: string;
  id?: string;
  rows?: number;
  ariaLabel?: string;
  name?: string;
  className?: string;
  hint?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
}

const DeTextarea: React.FC<TextareaProps> = ({
  id = createRandomId(),
  rows = 2,
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
  onBlur,
}) => {
  // Method
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event);
  };

  return (
    <div className="w-full flex flex-col">
      <textarea
        className={`border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 px-4 py-3 w-full rounded-md overflow-y-auto ${className}`}
        id={id}
        rows={rows}
        title={title || placeholder}
        name={name}
        value={value}
        aria-label={ariaLabel || title || placeholder}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
      />
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

export default DeTextarea;
