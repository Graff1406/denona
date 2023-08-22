import { FC, ReactElement } from "react";

interface Props {
  label: string;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: ReactElement;
  onClick?: () => void;
  areaLabel?: string;
  title?: string;
  cta?: boolean;
  loading?: boolean;
}

const ZnButton: FC<Props> = ({
  label,
  className,
  disabled,
  icon,
  areaLabel,
  title,
  cta,
  loading,
  onClick,
}): ReactElement => {
  let classes = "";

  if (cta)
    classes =
      "bg-yellow-700 text-white border border-amber-800 hover:bg-amber-800 active:bg-yellow-700";
  else
    classes += "border border-primary-dark hover:bg-stone-50 active:bg-white";

  return (
    <button
      className={[
        classes,
        "flex gap-2 items-center px-3 py-1 rounded-md font-semibold smooth shadow-sm  h-10 no-select",
        className,
      ].join(" ")}
      aria-label={areaLabel || label}
      title={title || label}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {" "}
      {loading ? (
        <div className="custom-loader h-6 w-6"></div>
      ) : (
        <span className="flex gap-2">
          {icon}
          {label}
        </span>
      )}
    </button>
  );
};

export default ZnButton;
