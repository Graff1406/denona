import { useEffect, useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
function SwitchThemeColor() {
  const [theme, setTheme] = useState(null);

  const onSwitchThemeColor = () => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setTheme('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setTheme(theme)
  }, [])

  return (
    <>
      <button onClick={onSwitchThemeColor}>
        { theme === "dark" ?  <BsFillSunFill />: <BsFillMoonFill /> }
      </button>
    </>
  )
}

export default SwitchThemeColor