import { useEffect, useState } from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";

import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

import ChangeThemeButton from './ChangeThemeButton';

const NavBar = () => {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
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
    <motion.div
      className='flex flex-row justify-between gap-4 mb-3 items-start max-w-7xl mx-auto'>
      <motion.div className='text-black flex items-center gap-2'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 }
        }}
      >
        <span onClick={() => changeLanguage("ru")} className="cursor-pointer fi fi-ru"></span>
        <span onClick={() => changeLanguage("en")} className="cursor-pointer fi fi-gb"></span>
        <span onClick={() => changeLanguage("de")} className="cursor-pointer fi fi-de"></span>
        <span onClick={() => changeLanguage("id")} className="cursor-pointer fi fi-id"></span>
        <span onClick={() => changeLanguage("ko")} className="cursor-pointer fi fi-kr"></span>
        <span onClick={() => changeLanguage("ja")} className="cursor-pointer fi fi-jp"></span>
        <span onClick={() => changeLanguage("zh")} className="cursor-pointer fi fi-cn"></span>
      </motion.div>
      <ChangeThemeButton onHandleSwitchTheme={handleSwitchTheme} />
    </motion.div>
  )
}

export default NavBar