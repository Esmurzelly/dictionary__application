import { useSelector, useDispatch } from 'react-redux';
import NavBar from '@/components/NavBar';
import { addFavouriteWord, removeFavouriteWord } from '@/store/favouritesWords';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useMediaQuery from '@/hook/useMediaQuery';


const Bookmarks = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const [deletedItems, setDeletedItems] = useState(
        ['adam', 'bert']
    );

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
        console.log('widgetType', widgetType);
        dispatch(addFavouriteWord(widgetType));
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    };

    const handleAddFavouriteWord = (item: string) => {
        dispatch(addFavouriteWord(item));
    }
    const handleRemoveFavouriteWord = (item: string) => {
        const indexToRemove = favouriteWords.indexOf(item);
        if (indexToRemove !== -1) {
            dispatch(removeFavouriteWord(indexToRemove));
        }
        setDeletedItems([...deletedItems, item])
    }

    return (
        <div className="app min-h-screen p-5 bg-secondary dark:bg-primary dark:text-white">
            <div className='max-w-7xl mx-auto'>
                <NavBar />



                {isAboveMediumScreens ? (
                    <>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col gap-1'>
                                <h1>{t('Bookmarks')}</h1>

                                {favouriteWords.map((item: string) => (
                                    <div
                                        draggable
                                        onDragStart={(e) => handleOnDrag(e, `${item}`)}
                                        className='flex gap-3 align-top justify-between'
                                    >
                                        {item}
                                        <button
                                            className='bg-red-500 w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleRemoveFavouriteWord(item)}
                                        >{t('Delete')}</button>
                                    </div>

                                ))}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <h1>{t('HistoryRequests')}</h1>
                                {historyWords.map((item: string) => (
                                    <div
                                        draggable
                                        onDragStart={(e) => handleOnDrag(e, `${item}`)}
                                        className='flex gap-3 align-top justify-between'
                                    >
                                        {item}
                                        <button
                                            className='bg-blue-500 w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleAddFavouriteWord(item)}
                                        >{t('Add')}</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h1 className='mt-10'>{t("Bookmarks")}</h1>
                        <div
                            className='border border-blue-500 p-3 mt-3'
                            onDrop={handleOnDrop} onDragOver={handleDragOver}
                        >
                            {favouriteWords.map((word: string, index: number) => (
                                <div key={index}>
                                    {word}
                                </div>
                            ))}
                        </div>
                    </>

                ) : (
                    <>
                        <div className='flex flex-row justify-between flex-wrap gap-10'>
                            <div className='flex flex-col gap-1'>
                                <h1>{t('Bookmarks')}</h1>

                                {favouriteWords.map((item: string) => (
                                    <div className='flex gap-3 align-top justify-between'>
                                        <span>{item}</span>
                                        <button
                                            className='bg-red-500 w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleRemoveFavouriteWord(item)}
                                        >{t('Delete')}</button>
                                    </div>

                                ))}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <h1>{t('DeletedWords')}</h1>

                                {deletedItems.map((item) => (
                                    <div className="flex gap-3 align-top justify-between">
                                        <span>{item}</span>
                                        <button
                                            className='bg-blue-500 w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleAddFavouriteWord(item)}
                                        >{t('Add')}</button>
                                    </div>
                                ))}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <h1>{t('HistoryRequests')}</h1>

                                {historyWords.map((item: string) => (
                                    <div className='flex gap-3 align-top justify-between'>
                                         <span>{item}</span>
                                         <button
                                            className='bg-blue-500 w-[100px] py-1 px-2 rounded-sm text-white'
                                            onClick={() => handleAddFavouriteWord(item)}
                                        >{t('Add')}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}



                <button className='mt-10 bg-blue-500 w-[170px] py-1 px-2 rounded-sm text-white' onClick={() => navigate(-1)}>Назад</button>
            </div>
        </div>
    )
}

export default Bookmarks