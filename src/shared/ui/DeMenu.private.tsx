import { FC, useState, useRef, ReactNode } from "react";

// Shared

import { useClickOutside } from "@/shared/hooks";

// Interfaces

interface Props {
  children: ReactNode;
  activator: ReactNode;
  closeOnContent?: boolean;
}

const DeMenu: FC<Props> = ({ children, activator, closeOnContent }) => {
  // State

  const [open, setOpen] = useState(false);
  const [isOutsideClicked, setIsOutsideClicked] = useState(false);

  // Ref

  const ref = useRef<HTMLDivElement>(null);

  // Methods

  const toggleDropdown = () => {
    if (isOutsideClicked) {
      setIsOutsideClicked(false);
      return;
    }
    setOpen((prevOpen) => !prevOpen);
  };

  const onCloseOnContent = () => {
    if (closeOnContent) toggleDropdown();
  };

  const onClose = () => {
    setIsOutsideClicked(true);
    setOpen((prevOpen) => !prevOpen);
    setTimeout(() => {
      setIsOutsideClicked(false);
    }, 200);
  };

  // Use

  useClickOutside(ref, onClose);

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown}>{activator}</div>

      {open && (
        <div
          ref={ref}
          className="origin-top-right absolute -right-1 mt-1 min-w-min rounded-md shadow-lg border border-zinc-900 bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5"
          onClick={onCloseOnContent}
        >
          <div
            className="py-1 w-full"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeMenu;
