import { useEffect, useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { toggleThemeMode } from "@/shared/helpers";
import { DnIconButton } from "@/shared/ui";

function SwitchThemeColor() {
  const localStorageThemeMode = localStorage.getItem("theme") ?? "light";

  const [themeMode, setThemeMode] = useState<string>(localStorageThemeMode);

  const onSwitchThemeColor = () => {
    if (themeMode === "dark") {
      setThemeMode(() => "light");
      toggleThemeMode("remove");
      localStorage.setItem("theme", "light");
    } else {
      setThemeMode(() => "dark");
      toggleThemeMode("add");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    if (themeMode === "dark") toggleThemeMode("add");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DnIconButton
        icon={
          themeMode === "dark" ? (
            <BsFillSunFill className="w-6 h-6" />
          ) : (
            <BsFillMoonFill className="w-6 h-6" />
          )
        }
        areaLabel="Theme toggled"
        onClick={onSwitchThemeColor}
      />
    </>
  );
}

export default SwitchThemeColor;
