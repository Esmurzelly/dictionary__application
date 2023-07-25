import axios from 'axios';
import { useState } from 'react';
import ListDetails from '@/components/ListDetails';
import { IResult } from '@/types';

import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import PopularWords from '@/components/PopularWords';
import Favourites from '@/components/Favourites';

import { addFavouriteWord, removeFavouriteWord } from '@/store/favouritesWords';
import { addHistoryWord } from '@/store/historyRequests';
import HistoryRequests from '@/components/HistoryRequests';

import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import { motion } from 'framer-motion'


const MainContent = () => {
    const [keyWord, setKeyWord] = useState<string>('');
    const [result, setResult] = useState<null | IResult>(null);

    const favouriteWords = useSelector((state: any) => state.favourite.favourites);
    const historyWords = useSelector((state: any) => state.history.history)

    const dispatch = useDispatch();

    const addHistoryWordFunction = (item: string) => {
        dispatch(addHistoryWord(item))
    }

    const { t } = useTranslation();
    
    const api = import.meta.env.VITE_REACT_API_URL;

    const handleSearch = async () => {
        try {
            const res = await axios.get(`${api}/${keyWord}`);
            setResult(res.data[0]);

            addHistoryWordFunction(keyWord)


        } catch (error) {
            console.log(error);
            toast.error(`Введенное слово "${keyWord}" является некорректным`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
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
        if (indexToRemove !== -1) {
            dispatch(removeFavouriteWord(indexToRemove));
        }
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <form
                onClick={e => e.preventDefault()}
                className='flex flex-col gap-3 items-start'
            >
                <motion.input
                    type="text"
                    value={keyWord}
                    onChange={e => setKeyWord(e.target.value)}
                    placeholder={t('Enter_word')}
                    className='bg-gray-700 rounded-md w-full h-[50px] focus:outline-none placeholder:text-white placeholder:opacity-40 px-2 text-white'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        visible: { opacity: 1, x: 0 }
                    }}
                />

                <motion.div
                    className="flex flex-row gap-8 flex-wrap"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, x: 100 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <div className='flex flex-row basis-full gap-2'>
                        <button
                            type='submit'
                            onClick={handleSearch}
                            className='bg-moonstore w-[33.3%] py-1 px-2 rounded-sm text-sm text-white'
                        >
                            {t('Search')}
                        </button>

                        <button
                            disabled={!result}
                            onClick={handleClear}
                            className='bg-chilli_red w-[33.3%] py-1 px-2 rounded-sm text-sm text-white'
                        >
                            {t('Clear')}
                        </button>

                        <button
                            disabled={!result}
                            onClick={() => handleCopy(keyWord)}
                            className='bg-orange w-[33.3%] py-1 px-2 rounded-sm text-sm text-white'
                        >
                            {t('Copy')}
                        </button>
                    </div>


                    <button
                        disabled={!result}
                        onClick={() => handleAddFavouriteWord(keyWord)}
                        className='bg-moonstore w-full py-1 px-2 rounded-sm text-sm text-white sm:w-[100px]'
                    >
                        {t('addToBookmark')}
                    </button>

                    <button
                        onClick={() => handleRemoveFavouriteWord(keyWord)}
                        className='bg-chilli_red w-full py-1 px-2 rounded-sm text-sm text-white sm:w-[100px]'
                    >
                        {t('removeFromBookmark')}
                    </button>
                </motion.div>
            </form>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 }
                }}
            >
                {result && <ListDetails
                    updateData={updateData}
                    phonetics={result.phonetics}
                    word={result.word}
                    meanings={result.meanings}
                />}

                <PopularWords updateData={updateData} />

                <Favourites updateData={updateData} />

                <HistoryRequests updateData={updateData} arrWords={historyWords} />
            </motion.div>
        </div>
    )
}

export default MainContent