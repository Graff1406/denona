import { useEffect, useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
function SwitchThemeColor() {
  const [theme, setTheme] = useState<string | null>(null);

  const onSwitchThemeColor = () => {
    const theme = localStorage.getItem("theme");
    const scrollbars = document.querySelectorAll(".scrollbar");

    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      scrollbars.forEach((el) => el.classList.remove("scrollbar-dark"));
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      scrollbars.forEach((el) => el.classList.add("scrollbar-dark"));
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
