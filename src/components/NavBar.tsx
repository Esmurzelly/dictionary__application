import { useEffect, useState } from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";

import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const {t, i18n} = useTranslation();

  const [theme, setTheme] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';
  });

  useEffect(() => {
    if(theme === 'dark') {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSwitchTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  const changeLanguage = (language: any) => {
    i18n.changeLanguage(language)
  }

  return (
    <div className='flex justify-between mb-3 items-start max-w-7xl mx-auto'>
      <div className='text-black flex items-center gap-2'>
        <span onClick={() => changeLanguage("ru")} className="cursor-pointer fi fi-ru"></span>
        <span onClick={() => changeLanguage("en")} className="cursor-pointer fi fi-gb"></span>
        <span onClick={() => changeLanguage("de")} className="cursor-pointer fi fi-de"></span>
        <span onClick={() => changeLanguage("es")} className="cursor-pointer fi fi-es"></span>
        <span onClick={() => changeLanguage("it")} className="cursor-pointer fi fi-it"></span>
        <span onClick={() => changeLanguage("zh")} className="cursor-pointer fi fi-cn"></span>
      </div>
      <button 
        onClick={handleSwitchTheme}
        className='bg-black px-2 py-1 rounded-sm text-white w-[150px]'>{t("Theme")}</button>
    </div>
  )
}

export default NavBar