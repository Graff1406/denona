import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: ReactElement;
  areaLabel: string;
  title?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  id?: string;
  onClick?: () => void;
}

const DnButton: FC<Props> = ({
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
  onClick,
}): ReactElement => {
  const Button = () => (
    <button
      className={[
        "flex justify-center items-center rounded-full hover:bg-stone-100 dark:hover:bg-zinc-900 active:bg-stone-200 smooth no-select",
        className,
      ].join(" ")}
      id={id}
      aria-label={areaLabel}
      title={title || areaLabel}
      disabled={disabled}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onClick={onClick}
    >
      <span className="flex justify-center items-center w-6 h-6 m-2">
        {loading ? <div className="custom-loader h-6 w-6"></div> : icon}
      </span>
    </button>
  );
  return to ? (
    <Link to={to}>
      <Button />
    </Link>
  ) : (
    <Button />
  );
};

export default DnButton;
