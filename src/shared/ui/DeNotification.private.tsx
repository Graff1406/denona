import React, { useEffect, useState } from "react";

// Shared

import { DeIconButton } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
// Icon

import { IoMdClose } from "react-icons/io";

interface DeNotificationProps {
  type?: "success" | "warning" | "error";
  position?: "top-center" | "bottom-center";
  text: string;
  activate: boolean;
  timeout?: number;
  onClose: () => void;
}

const DeNotification: React.FC<DeNotificationProps> = ({
  type = "success",
  position = "bottom-center",
  text,
  activate,
  timeout = 4000,
  onClose,
}) => {
  // Use

  const { $t } = useTranslations();

  // State

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (activate) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activate, onClose, timeout]);

  // Methods

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div
      className={[
        "fixed max-w-xs w-full transition-transform duration-300 transform z-40",
        isVisible ? "translate-y-0" : "translate-y-40",
        position === "top-center"
          ? "top-4 left-1/2 transform -translate-x-1/2"
          : "bottom-4 left-1/2 transform -translate-x-1/2",
      ].join(" ")}
    >
      <div
        className={[
          "text-white p-2 tablet:p-4 rounded-lg border-l-4 border-white shadow-md",
          type === "success"
            ? "bg-green-500"
            : type === "warning"
            ? "bg-orange-500"
            : "bg-red-500",
        ].join(" ")}
      >
        <div className="flex justify-between items-center">
          <p>{text}</p>
          <DeIconButton
            className="hover:bg-red-600"
            icon={<IoMdClose className="w-6 h-6" />}
            areaLabel={$t.bannerButtonCloseLabel}
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default DeNotification;
