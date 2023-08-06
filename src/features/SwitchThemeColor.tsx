import { useEffect, useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
function SwitchThemeColor() {
  const [theme, setTheme] = useState<string | null>(null);

  const onSwitchThemeColor = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      // document.documentElement.style.setProperty(
      //   "--webkit-scrollbar-thumb",
      //   "#e5e7eb"
      // );
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      // document.documentElement.style.setProperty(
      //   "--webkit-scrollbar-thumb",
      //   "#3f3f46"
      // );
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") ?? null;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(localTheme);
    onSwitchThemeColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        onClick={onSwitchThemeColor}
        className="border border-inherit dark:border-zinc-700 p-1.5 rounded-md shadow hover:bg-slate-50 dark:hover:bg-zinc-900"
      >
        {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
      </button>
    </>
  );
}

export default SwitchThemeColor;
