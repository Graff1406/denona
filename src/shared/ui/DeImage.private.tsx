import { FC, useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string | null | undefined;
  alt: string;
  lazy?: boolean;
  className?: string;
}

const LazyImage: FC<LazyImageProps> = ({
  src,
  alt,
  className,
  lazy = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fakeImg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  useEffect(() => {
    if (lazy) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const img = imageRef.current;
          if (img) {
            img.src = src || fakeImg;
            img.onload = () => {
              setLoaded(true);
              observer.unobserve(img);
            };
          }
        }
      }, options);

      if (imageRef.current) {
        observer.observe(imageRef.current);
      }

      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    } else {
      const img = imageRef.current;
      if (img) {
        img.src = src || fakeImg;
        img.onload = () => {
          setLoaded(true);
        };
      }
    }
  }, [src, lazy]);

  return (
    <div className="relative">
      {!loaded && lazy && <div className="skeleton absolute inset-0"></div>}
      <img
        ref={imageRef}
        src={lazy ? "" : src || fakeImg}
        alt={alt}
        className={`${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
};

export default LazyImage;
