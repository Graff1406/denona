import { FC, ReactNode, useEffect } from "react";

// Shared

import { DeIconButton } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";
// Icon

import { IoMdClose } from "react-icons/io";

interface ModalProps {
  active: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
}

const Modal: FC<ModalProps> = ({
  active,
  onClose,
  children,
  showCloseButton = false,
}) => {
  // Use

  const { $t } = useTranslations();

  // Methods
  // Close the modal on Esc key press
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Close the modal on background click
  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    // Add event listeners on mount
    window.addEventListener("keydown", handleKeyPress);
    document.body.style.overflow = active ? "hidden" : ""; // Disable body scroll when modal is active

    // Remove event listeners on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = ""; // Enable body scroll on modal close
    };
  }, [active]);

  return (
    <div
      className={`z-50 fixed inset-0 bg-zinc-600 bg-opacity-50 transition-opacity ${
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClickOutside}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white p-4 transform transition-transform ease-in-out duration-300 ${
          active ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {showCloseButton && (
          <DeIconButton
            className="absolute top-2 right-2 p-2 z-50"
            icon={<IoMdClose className="w-6 h-6" />}
            areaLabel={$t.bannerButtonCloseLabel}
            onClick={onClose}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
