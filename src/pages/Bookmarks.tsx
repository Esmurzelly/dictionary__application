import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@/hook/useMediaQuery';

import { addFavouriteWord, removeFavouriteWord } from '@/store/favouritesWords';

import NavBar from '@/components/NavBar';

import { motion } from 'framer-motion'
import Footer from '@/components/Footer';


const Bookmarks = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const [deletedItems, setDeletedItems] = useState<string[]>([]);

    const { t } = useTranslation();

    const favouriteWords = useSelector((state: any) => state.favourite.favourites);
    const historyWords = useSelector((state: any) => state.history.history);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType)
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        dispatch(addFavouriteWord(widgetType));
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    };

    const handleAddFavouriteWord = (item: string) => {
        dispatch(addFavouriteWord(item));
        setDeletedItems((prev) => prev.filter((deletedItem) => deletedItem !== item));
    }

    const handleRemoveFavouriteWord = (item: string) => {
        const indexToRemove = favouriteWords.indexOf(item);
        if (indexToRemove !== -1) {
            dispatch(removeFavouriteWord(indexToRemove));
        }
        setDeletedItems([...deletedItems, item])
    }

    return (
        <div className="app min-h-screen p-5 bg-secondary  dark:bg-primary dark:text-white">
            <div className='max-w-7xl mx-auto min-h-screen'>
                <NavBar />
                {isAboveMediumScreens ? (
                    <>
                        <div className='flex flex-row justify-between'>
                            <motion.div className='flex flex-col gap-1 h-full overflow-x-auto'
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: { opacity: 1, x: 0 }
                                }}>
                                <h1>{t('Bookmarks')}</h1>

                                {favouriteWords.map((item: string) => (
                                    <div
                                        draggable
                                        onDragStart={(e) => handleOnDrag(e, `${item}`)}
                                        className='flex gap-3 align-top justify-between'
                                    >
                                        {item}
                                        <button
                                            className='bg-chilli_red w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleRemoveFavouriteWord(item)}
                                        >{t('Delete')}</button>
                                    </div>

                                ))}
                            </motion.div>

                            <motion.div className='flex flex-col items-end gap-1'
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                variants={{
                                    hidden: { opacity: 0, x: 100 },
                                    visible: { opacity: 1, x: 0 }
                                }}>
                                <h1>{t('DeletedWords')}</h1>
                                <button
                                    className='bg-orange w-[100px] py-1 px-2 rounded-sm text-whi'
                                    onClick={() => setDeletedItems([])}>
                                    {t('Clear')}
                                </button>

                                {deletedItems.map((item) => (
                                    <div className="flex gap-3 align-top justify-between">
                                        <span>{item}</span>
                                        <button
                                            className='bg-blue-500 w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleAddFavouriteWord(item)}
                                        >{t('Add')}</button>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div className='flex flex-col gap-1'
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: { opacity: 1, x: 0 }
                                }}>
                                <h1>{t('HistoryRequests')}</h1>
                                {historyWords.map((item: string) => (
                                    <div
                                        draggable
                                        onDragStart={(e) => handleOnDrag(e, `${item}`)}
                                        className='flex gap-3 align-top justify-between'
                                    >
                                        {item}
                                        <button
                                            className='bg-moonstore w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleAddFavouriteWord(item)}
                                        >{t('Add')}</button>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

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
                            <h1 className='mt-10'>{t("Bookmarks")}</h1>
                            <div
                                className='rounded-lg bg-moonstore p-3 mt-3 w-full h-[400px] overflow-x-auto'
                                onDrop={handleOnDrop} onDragOver={handleDragOver}
                            >
                                {favouriteWords.map((word: string, index: number) => (
                                    <div key={index}>
                                        {word}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </>

                ) : (
                    <>
                        <div
                            className='grid grid-cols-2 grid-rows-1'
                        >
                            <motion.div className='flex flex-col gap-1'
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: { opacity: 1, x: 0 }
                                }}>
                                <h1>{t('Bookmarks')}</h1>

                                {favouriteWords.map((item: string) => (
                                    <motion.div
                                        className='flex gap-3 align-top justify-between'
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true,  }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        variants={{
                                            hidden: { opacity: 0, x: -100 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <span>{item}</span>
                                        <button
                                            className='bg-chilli_red w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleRemoveFavouriteWord(item)}
                                        >{t('Delete')}</button>
                                    </motion.div>

                                ))}
                            </motion.div>

                            <motion.div className='flex flex-col items-end gap-1'
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                variants={{
                                    hidden: { opacity: 0, x: 100 },
                                    visible: { opacity: 1, x: 0 }
                                }}>
                                <h1>{t('DeletedWords')}</h1>
                                <button
                                    className='bg-orange w-[100px] py-1 px-2 rounded-sm text-white'
                                    onClick={() => setDeletedItems([])}>
                                    {t('Clear')}
                                </button>

                                {deletedItems.map((item) => (
                                    <motion.div
                                        className="flex gap-3 align-top justify-between"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        variants={{
                                            hidden: { opacity: 0, x: -100 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <span>{item}</span>
                                        <button
                                            className='bg-moonstore w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleAddFavouriteWord(item)}
                                        >{t('Add')}</button>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div className='flex flex-col gap-1 mt-5'
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: { opacity: 1, x: 0 }
                                }}>
                                <h1>{t('HistoryRequests')}</h1>

                                {historyWords.map((item: string) => (
                                    <div className='flex gap-3 align-top justify-between'>
                                        <span>{item}</span>
                                        <button
                                            className='bg-moonstore w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleAddFavouriteWord(item)}
                                        >{t('Add')}</button>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </>
                )}



                <motion.button
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    className='mt-10 bg-gray-700 w-[170px] py-1 px-2 rounded-sm text-white'
                    onClick={() => navigate(-1)}
                >
                    {t('Back')}
                </motion.button>
            </div>

            <Footer />
        </div>
    )
}

export default Bookmarks