import { createSlice } from '@reduxjs/toolkit';

interface IPopular {
    popular: Array<string>;
}

const initialState: IPopular = {
    popular: ['map', 'go', 'ahead', 'return', 'fool', 'mother', 'issue']
};

const popularSlice = createSlice({
    name: 'popularSlice',
    initialState,
    reducers: {}
});

export const { /* экшены */ } = popularSlice.actions; // Замените `/* экшены */` на имена экшенов, которые вы определяете внутри createSlice
export default popularSlice.reducer;
