import { FC, useState, ReactNode } from "react";

// Shared

import { DeCheckbox, DeButton } from "@/shared/ui";
import { useTranslations } from "@/shared/hooks";

interface Props {
  children: ReactNode;
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  onChange?: (isChecked: boolean) => void;
}

const Banner: FC<Props> = ({
  title,
  header,
  footer,
  children,
  className,
  onChange,
}) => {
  // Use

  const { $t } = useTranslations();
  // State

  const [bannerVisible, setBannerVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const hideBanner = () => {
    setBannerVisible(false);
  };

  const handleChange = () => {
    setIsChecked(!isChecked);

    if (onChange) onChange(!isChecked);
  };

  if (!bannerVisible) {
    return null;
  }

  return (
    <section
      className={`border border-zinc-200 dark:border-zinc-700 rounded space-y-4 bg-zinc-50 dark:bg-zinc-900 dark:shadow-xl text-sm tablet:text-base ${className}`}
    >
      <header className="border-b border-zinc-200 dark:border-zinc-700 p-3">
        {header || (
          <h2 className="text-base tablet:text-lg flex justify-center gap-1">
            {title}
          </h2>
        )}
      </header>

      <div className="p-3">{children}</div>

      <footer className="border-t border-zinc-200 dark:border-zinc-700 p-3">
        {footer || (
          <div className="flex justify-between">
            <DeCheckbox
              label={$t.bannerCheckboxLabel}
              checked={isChecked}
              onChange={handleChange}
            />

            <DeButton
              label={$t.bannerButtonCloseLabel}
              areaLabel={$t.bannerButtonCloseAreaLabel}
              onClick={hideBanner}
            />
          </div>
        )}
      </footer>
    </section>
  );
};

export default Banner;
