import { FC, ReactElement } from "react";

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
  else classes += "border border-zinc-700 hover:bg-stone-50 active:bg-white";

  return (
    <button
      className={[
        classes,
        " h-10 min-w-min px-2.5 rounded-md font-semibold smooth shadow-sm box-border no-select overflow-hidden whitespace-nowrap truncate",
        disabled ? "cursor-not-allowed opacity-40" : "",
        className,
      ].join(" ")}
      aria-label={areaLabel || label}
      title={areaLabel || label}
      disabled={disabled || loading}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {" "}
      {loading ? (
        <div className="custom-loader h-6 w-6"></div>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {icon}
          {label}
        </span>
      )}
    </button>
  );
};

export default ZnButton;
