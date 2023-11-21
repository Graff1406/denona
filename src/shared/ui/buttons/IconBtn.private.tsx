import { FC, ReactElement, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: ReactElement;
  areaLabel?: string;
  title?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  id?: string;
  tabIndex?: number;
  cta?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const DeButton: FC<Props> = ({
  className,
  disabled,
  icon,
  areaLabel,
  title,
  loading,
  to,
  ariaExpanded,
  ariaControls,
  id,
  cta,
  tabIndex = 0,
  onClick,
}): ReactElement => {
  const Button = () => (
    <button
      className={[
        "flex justify-center items-center rounded-full smooth no-select",
        className,
        cta
          ? "bg-yellow-700 text-white border border-amber-800 hover:bg-amber-800 active:bg-yellow-700"
          : "hover:bg-stone-100 dark:hover:bg-zinc-900 active:bg-stone-200",
      ].join(" ")}
      id={id}
      aria-label={areaLabel}
      title={title || areaLabel}
      disabled={disabled}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      <span
        className={[
          "flex justify-center items-center w-6 h-6 m-2",
          cta ? "text-white" : "",
        ].join(" ")}
      >
        {loading ? <div className="custom-loader h-6 w-6"></div> : icon}
      </span>
    </button>
  );
  return to ? (
    <Link to={to} aria-label={areaLabel}>
      <Button />
    </Link>
  ) : (
    <Button />
  );
};

export default DeButton;
