import { useDispatch } from 'react-redux';
import { clearHistoryWord } from '@/store/historyRequests';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


type Props = {
  arrWords: Array<string>
  updateData: (value: string) => void
}

const HistoryRequests = ({ arrWords, updateData }: Props) => {
  const [showHistoryWord, setShowHistoryWord] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const clearHistoryWordFunction = () => {
    dispatch(clearHistoryWord())
    setShowHistoryWord(false);
  }

  const handleSwitchWord = () => {
    setShowHistoryWord(prev => !prev);
  }

  return (
    <div className='mt-5 max-w-7xl mx-auto'>
      <div className='flex gap-1'>
        <h1>{t('HistoryRequests')}</h1>
        {showHistoryWord ? (
          <ChevronDoubleUpIcon onClick={handleSwitchWord} className='w-3 cursor-pointer' />
        ) : (
          <ChevronDoubleDownIcon onClick={handleSwitchWord} className='w-3 cursor-pointer' />
        )}
      </div>


      {showHistoryWord && (
        <div>
          <div className='grid grid-cols-2'>
            {arrWords.map((item, index) => (
              <p className='cursor-pointer' onClick={() => updateData(item)} key={index}>{item}</p>
            ))}


          </div>
          <button
            className='bg-chilli_red w-[170px] py-1 px-2 rounded-sm text-white mt-3'
            onClick={() => clearHistoryWordFunction()}
          >
            {t('ClearHistory')}
          </button>
        </div>
      )}
    </div>
  )
}

export default HistoryRequests