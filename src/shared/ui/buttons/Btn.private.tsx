import { FC, ReactElement } from "react";
// Icons

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  label: string;
  areaLabel: string;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: ReactElement;
  onClick?: () => void;
  cta?: boolean;
  loading?: boolean;
  tabIndex?: number;
}

const ZnButton: FC<Props> = ({
  label,
  className,
  disabled,
  icon,
  areaLabel,
  cta,
  loading,
  tabIndex = 0,
  onClick,
}): ReactElement => {
  let classes = "";

  if (cta)
    classes =
      "bg-yellow-700 text-white border border-amber-800 hover:bg-amber-800 active:bg-yellow-700";
  else
    classes +=
      "border border-zinc-700 bg-white hover:bg-stone-50 active:bg-white dark:hover:bg-zinc-900 dark:active:bg-zinc-800 dark:shadow-lg";

  return (
    <button
      className={[
        classes,
        "flex items-center justify-center gap-3 h-10 min-w-min px-2.5 rounded-md font-semibold smooth shadow-sm box-border no-select overflow-hidden whitespace-nowrap truncate relative",
        disabled ? "cursor-not-allowed opacity-40" : "",
        loading ? (cta ? "bg-amber-800" : "bg-zinc-50") : "",
        className,
      ].join(" ")}
      aria-label={areaLabel || label}
      title={areaLabel || label}
      disabled={disabled || loading}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      <AiOutlineLoading3Quarters
        className={[
          "animate-spin w-5 h-5 animation absolute ",
          loading ? "visible z-10" : "invisible -z-10",
          cta ? "text-white" : "text-primary-dark",
        ].join(" ")}
      />
      <span
        className={[
          "flex items-center justify-center gap-2 animation",
          loading ? "opacity-25" : "opacity-100",
        ].join(" ")}
      >
        {icon}
        {label}
      </span>
    </button>
  );
};

export default ZnButton;
