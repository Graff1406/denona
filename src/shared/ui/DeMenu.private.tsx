import { FC, useState, useRef, ReactNode, useEffect } from "react";
import { useClickOutside } from "@/shared/hooks";

interface Props {
  children: ReactNode;
  activator: ReactNode;
  closeOnContent?: boolean;
}

const DeMenu: FC<Props> = ({ children, activator, closeOnContent }) => {
  const [open, setOpen] = useState(false);
  const [isOutsideClicked, setIsOutsideClicked] = useState(false);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const ref = useRef<HTMLDivElement>(null);
  const activatorRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (activatorRef.current && ref.current) {
      const activatorRect = activatorRef.current.getBoundingClientRect();
      setPosition({
        top: activatorRect.bottom - 70,
        left: activatorRect.left - 20,
      });
    }
  };

  useEffect(() => {
    if (open) {
      calculatePosition();
    }
  }, [open]);

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

  useClickOutside(ref, onClose);

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown} ref={activatorRef}>
        {activator}
      </div>

      {open && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          className="origin-top-right min-w-min rounded-md shadow-lg border border-zinc-900 bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5"
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
