import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down" | null;

const useScrollDirection = (threshold = 0): ScrollDirection => {
  const element = document.getElementById("page-wrapper") as HTMLElement;

  // State

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    let prevScrollY = 0;

    const handleScroll = () => {
      if (element) {
        if (element instanceof HTMLElement) {
          const currentScrollY = element.scrollTop;

          if (currentScrollY > prevScrollY + threshold) {
            setScrollDirection("down");
          } else if (currentScrollY === 0) {
            setScrollDirection(null);
          } else if (currentScrollY < prevScrollY - threshold) {
            setScrollDirection("up");
          }
          prevScrollY = currentScrollY;
        }
      }
    };

    if (element && element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element && element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [element, threshold]);

  return scrollDirection;
};

export default useScrollDirection;
