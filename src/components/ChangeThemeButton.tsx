import { useTranslation } from 'react-i18next';

type Props = {
  onHandleSwitchTheme: () => void
}

const ChangeThemeButton = ({onHandleSwitchTheme}: Props) => {
  const { t } = useTranslation();
  return (
    <button
        onClick={onHandleSwitchTheme}
        className='bg-black px-2 py-1 rounded-sm text-sm text-white w-[150px] dark:bg-white dark:text-black'>
          {t("Theme")}
      </button>
  )
}

export default ChangeThemeButton