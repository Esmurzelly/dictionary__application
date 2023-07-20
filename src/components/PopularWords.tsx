import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';

type Props = {
  updateData: (value: string) => void; 
}

const PopularWords = ({updateData}: Props) => {
  const [showWords, setShowWords] = useState<boolean>(false);
  const history = useSelector((state: any) => state.history.history);

  const handleSwitchWord = () => {
    setShowWords(prev => !prev)
  }

  return (
    <div className='mt-5 max-w-7xl mx-auto'>
      <div className='flex gap-1'>
        <h1>Популярные слова</h1>
        {showWords ? (
          <ChevronDoubleUpIcon onClick={handleSwitchWord} className='w-3 cursor-pointer' />
        ) : (
          <ChevronDoubleDownIcon onClick={handleSwitchWord} className='w-3 cursor-pointer' />
        )}
      </div>
      {showWords && (
        <ul className='grid grid-cols-3'>
          {history.map((item: string, index: number) => (
            <li 
              key={index}
              onClick={() => updateData(item)}
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