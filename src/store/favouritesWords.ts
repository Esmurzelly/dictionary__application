import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const removeDublicates = (array: string[]):string[] => {
    return [...new Set(array)]
}

interface IFavourites {
    favourites: Array<string>
}

const initialState: IFavourites = {
    favourites: removeDublicates(JSON.parse(localStorage.getItem('favouriteWords') || '[]'))
}


const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavouriteWord(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload.toLowerCase());
            state.favourites = removeDublicates(state.favourites);
            localStorage.setItem('favouriteWords', JSON.stringify(state.favourites));
        },
        removeFavouriteWord(state, action: PayloadAction<number>) {
            state.favourites.splice(action.payload, 1);
            localStorage.setItem('favouriteWords', JSON.stringify(state.favourites));
        }
    },
});

export const { addFavouriteWord, removeFavouriteWord } = favouritesSlice.actions;
export default favouritesSlice.reducer;