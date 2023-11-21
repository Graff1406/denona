import React, { useEffect, useState } from "react";

// Shared

import { DeIconButton } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
// Icon

import { IoMdClose } from "react-icons/io";

interface DeModalProps {
  title: string;
  activate: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const DeModal: React.FC<DeModalProps> = ({
  title,
  activate,
  onClose,
  children,
}) => {
  // Use

  const { $t } = useTranslations();

  // State

  const [isVisible, setIsVisible] = useState(activate);

  useEffect(() => {
    if (activate) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [activate]);

  return (
    <>
      <div
        className={[
          "fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-600 bg-opacity-50 animation",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="bg-white p-6 rounded-lg w-96">
          <div className="flex justify-end">
            <DeIconButton
              icon={<IoMdClose className="w-6 h-6" />}
              areaLabel={$t.bannerButtonCloseLabel}
              onClick={onClose}
            />
          </div>
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default DeModal;
