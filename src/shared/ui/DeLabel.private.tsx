import React from "react";

// Shared

import { DeIconButton } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
// Icon

import { IoMdClose } from "react-icons/io";

interface DeLabelProps {
  text: string;
  iconLeft?: React.ReactNode;
  onClose?: () => void;
  size?: "small" | "normal" | "large";
}

const DeLabel: React.FC<DeLabelProps> = ({
  text,
  iconLeft,
  onClose,
  size = "normal",
}) => {
  // Use

  const { $t } = useTranslations();

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "px-2 py-1 text-sm";
      case "normal":
        return "px-3 py-2";
      case "large":
        return "px-4 py-3 text-lg";
      default:
        return "px-3 py-2";
    }
  };

  return (
    <div
      className={[
        "flex items-center justify-between max-w-max  rounded-lg border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 animation px-2 py-1",
        size === "small" ? "text-sm" : size === "large" ? "text-lg" : "",
      ].join(" ")}
    >
      {iconLeft && <div className="mr-2">{iconLeft}</div>}
      <div className="flex-grow">{text}</div>
      {onClose && (
        <DeIconButton
          className={[
            "ml-2",
            size === "small"
              ? "w-5 h-5"
              : size === "large"
              ? "w-7 h-7"
              : "w-6 h-6",
          ].join(" ")}
          icon={
            <IoMdClose
              className={[
                size === "small"
                  ? "w-4 h-4"
                  : size === "large"
                  ? "w-6 h-6"
                  : "w-5 h-5",
              ].join(" ")}
            />
          }
          areaLabel={$t.bannerButtonCloseLabel}
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default DeLabel;
