import { FC, ReactElement } from "react";

interface Props {
  icon: ReactElement;
  areaLabel: string;
  title?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const ZnButton: FC<Props> = ({
  className,
  disabled,
  icon,
  areaLabel,
  title,
  loading,
  onClick,
}): ReactElement => {
  return (
    <button
      className={[
        "flex justify-center items-center rounded-full hover:bg-stone-100 dark:hover:bg-zinc-900 active:bg-stone-200 smooth no-select",
        className,
      ].join(" ")}
      aria-label={areaLabel}
      title={title || areaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex justify-center items-center w-6 h-6 m-2">
        {loading ? <div className="custom-loader h-6 w-6"></div> : icon}
      </span>
    </button>
  );
};

export default ZnButton;
