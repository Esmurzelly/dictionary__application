import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Props = {
  onHandleSwitchTheme: () => void
}

const ChangeThemeButton = ({onHandleSwitchTheme}: Props) => {
  const { t } = useTranslation();
  return (
    <motion.button
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0 }
        }}
        onClick={onHandleSwitchTheme}
        className='bg-black px-2 py-1 rounded-sm text-white w-[150px] dark:bg-white dark:text-black'>{t("Theme")}
      </motion.button>
  )
}

export default ChangeThemeButton