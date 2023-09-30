import { useEffect, RefObject } from "react";

function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  activate: boolean
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    if (ref.current && activate) {
      document.addEventListener("mousedown", handleClickOutside);
    } else document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
