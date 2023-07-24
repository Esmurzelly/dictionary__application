import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen p-5 bg-secondary  dark:bg-primary dark:text-white'>
      <div className='max-w-7xl mx-auto min-h-screen'>
        <NavBar />

        <p>{t("Not_Found")}</p>

      <button
        className='mt-10 bg-gray-700 w-[170px] py-1 px-2 rounded-sm text-white'
        onClick={() => navigate(-1)}
      >
        {t('Back')}
      </button>
      </div>      
    </div>
  )
}

export default NotFound