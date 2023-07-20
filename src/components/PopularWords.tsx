import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';


type Props = {
  updateData: (value: string) => void; 
}

const PopularWords = ({updateData}: Props) => {
  const [showWords, setShowWords] = useState<boolean>(false);
  const popular = useSelector((state: any) => state.popular.popular);

  const {t} = useTranslation();

  const handleSwitchWord = () => {
    setShowWords(prev => !prev)
  }

  return (
    <div className='mt-5 max-w-7xl mx-auto'>
      <div className='flex gap-1'>
        <h1>{t('PopularWord')}</h1>
        {showWords ? (
          <ChevronDoubleUpIcon onClick={handleSwitchWord} className='w-3 cursor-pointer' />
        ) : (
          <ChevronDoubleDownIcon onClick={handleSwitchWord} className='w-3 cursor-pointer' />
        )}
      </div>
      {showWords && (
        <ul className='grid grid-cols-3'>
          {popular.map((item: string, index: number) => (
            <li 
              key={index}
              onClick={() => updateData(item)}
              className='cursor-pointer'
            >
              {item}
            </li>
          ))}
        </ul>
      )}

    </div>

  )
}

export default PopularWords