import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFavourites {
    favourites: Array<string>
}

const initialState: IFavourites = {
    favourites: JSON.parse(localStorage.getItem('favouriteWords') || '["love", "brother", "come"]')
}

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavouriteWord(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload)
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