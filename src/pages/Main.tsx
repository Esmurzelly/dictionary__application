import axios from 'axios';
import { useState } from 'react';
import ListDetails from '@/components/ListDetails';
import { IResult } from '@/types';
import NavBar from '@/components/NavBar';

import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import PopularWords from '@/components/PopularWords';
import Favourites from '@/components/Favourites';

import { addFavouriteWord, removeFavouriteWord } from '@/store/favouritesWords';
import { addHistoryWord } from '@/store/historyRequests';
import HistoryRequests from '@/components/HistoryRequests';

// import Button from '@/components/Button'; // change

const Main = () => {
    const [keyWord, setKeyWord] = useState<string>('');
    const [result, setResult] = useState<null | IResult>(null);

    const favouriteWords = useSelector((state: any) => state.favourite.favourites);
    const historyWords = useSelector((state: any) => state.history.history)

    const dispatch = useDispatch();

    const addHistoryWordFunction = (item: string) => {
        dispatch(addHistoryWord(item))
    }

    const {t} = useTranslation();

    const api = "https://api.dictionaryapi.dev/api/v2/entries/en";

    const handleSearch = async () => {
        try {
            const res = await axios.get(`${api}/${keyWord}`);
            setResult(res.data[0]);

            addHistoryWordFunction(keyWord)

            console.log('res data ', res.data);
            console.log('res data [0] ', res.data[0]);
        } catch (error) {
            console.log(error)
        }
    };

    const handleClear = () => {
        setKeyWord('');
        setResult(null);
    };

    const updateData = async (value: string) => {
        setKeyWord(value);

        const res = await axios.get(`${api}/${value}`);
        setResult(res.data[0]);
        console.log('res data [0] changed ', res.data[0]);
    }

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.log('copy error', error)
        }
    }

    const handleAddFavouriteWord = (item: string) => {
        dispatch(addFavouriteWord(item));
    }
    const handleRemoveFavouriteWord = (item: string) => {
        const indexToRemove = favouriteWords.indexOf(item);
        if(indexToRemove !== -1) {
            dispatch(removeFavouriteWord(indexToRemove));
        }
    }

    return (
        <div className="app min-h-screen p-5 bg-secondary dark:bg-primary dark:text-white">
            <NavBar />
            <div className='max-w-7xl mx-auto'>
                <form
                    onClick={e => e.preventDefault()}
                    className='flex flex-col gap-3 items-start'
                >
                    <input
                        type="text"
                        value={keyWord}
                        onChange={e => setKeyWord(e.target.value)}
                        placeholder='Введите слово'
                        className='bg-gray-700 rounded-md w-full h-[50px] focus:outline-none placeholder:text-white placeholder:opacity-40 px-2 text-white'
                    />

                    <div
                        className="flex flex-row gap-8 flex-wrap"
                    >
                        <button
                            type='submit'
                            onClick={handleSearch}
                            className='bg-yellow-600 w-[100px] py-1 px-2 rounded-sm text-white'
                        >
                            {t('Search')}
                           
                        </button>

                        <button
                            disabled={!result}
                            onClick={handleClear}
                            className='bg-red-500 w-[100px] py-1 px-2 rounded-sm text-white'
                        >
                            {t('Clear')}
                        </button>

                        <button
                            disabled={!result}
                            onClick={() => handleCopy(keyWord)}
                            className='bg-blue-500 w-[100px] py-1 px-2 rounded-sm text-white'
                        >
                            {t('Copy')}
                        </button>

                        <button
                            disabled={!result}
                            onClick={() => handleAddFavouriteWord(keyWord)}
                            className='bg-blue-500 w-[100px] py-1 px-2 rounded-sm text-white'
                        >
                            {t('addToBookmark')}
                        </button>

                        <button
                            onClick={() => handleRemoveFavouriteWord(keyWord)}
                            className='bg-blue-500 w-[100px] py-1 px-2 rounded-sm text-white'
                        >
                            {t('removeFromBookmark')}
                        </button>
                    </div>
                </form>


                {result && <ListDetails
                    updateData={updateData}
                    phonetics={result.phonetics}
                    word={result.word}
                    meanings={result.meanings}
                />}
            </div>
            <PopularWords updateData={updateData} />

            <Favourites updateData={updateData} />

            <HistoryRequests updateData={updateData} arrWords={historyWords} />
        </div>
    )
}

export default Main