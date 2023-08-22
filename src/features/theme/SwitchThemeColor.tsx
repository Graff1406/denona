import { useEffect, useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { toggleThemeMode } from "@/shared/helpers";

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
      <button
        onClick={onSwitchThemeColor}
        className="border border-inherit dark:border-zinc-700 p-1.5 rounded-md shadow hover:bg-slate-50 dark:hover:bg-zinc-900"
      >
        {themeMode === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
      </button>
    </>
  );
}

export default SwitchThemeColor;
