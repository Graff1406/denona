import { useEffect, useState, RefObject } from "react";

type ScrollDirection = "up" | "down" | null;

const useScrollDirection = ({
  element,
  threshold = 0,
}: {
  element?: RefObject<HTMLElement | Window>;
  threshold?: number;
}): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    let prevScrollY = 0;

    const handleScroll = () => {
      if (element && element.current) {
        if (element.current instanceof HTMLElement) {
          const currentScrollY = element.current.scrollTop;

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

    if (element && element.current) {
      element.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element && element.current) {
        element.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [element, threshold]);

  return scrollDirection;
};

export default useScrollDirection;
