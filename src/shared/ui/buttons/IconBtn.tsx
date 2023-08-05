import { FC, ReactElement } from "react";

interface Props {
  icon: ReactElement;
  areaLabel: string;
  title?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ZnButton: FC<Props> = ({
  className,
  disabled,
  icon,
  areaLabel,
  title,
  onClick,
}): ReactElement => {
  return (
    <button
      className={[
        "flex justify-center items-center w-10 h-10 rounded-full hover:bg-stone-50 active:bg-stone-200 smooth no-select",
        className,
      ].join(" ")}
      aria-label={areaLabel}
      title={title || areaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default ZnButton;
