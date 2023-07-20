import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';

type Props = {
  updateData: (value: string) => void
}

const Favourites = ({updateData}: Props) => {
  const [showFavouriteWords, setShowFavouriteWords] = useState<boolean>(false);
  const favouriteWords = useSelector((state: any) => state.favourite.favourites);

  const handleSwitchWord = () => {
    setShowFavouriteWords(prev => !prev);
  }

  return (
    <div className='mt-5 max-w-7xl mx-auto'>
      <div className='flex gap-1'>
        <h1>Избранные слова</h1>
        {showFavouriteWords ? (
          <ChevronDoubleUpIcon onClick={handleSwitchWord} className='w-3 cursor-pointer' />
        ) : (
          <ChevronDoubleDownIcon onClick={handleSwitchWord} className='w-3 cursor-pointer' />
        )}
      </div>
      {showFavouriteWords && (
        <ul className='grid grid-cols-3'>
          {favouriteWords.map((item: string, index: number) => (
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

export default Favourites