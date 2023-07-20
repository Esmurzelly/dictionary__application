import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IHistory {
    history: Array<string>;
}

const initialState: IHistory = {
    history: ['map', 'go', 'ahead', 'return', 'fool', 'mother', 'issue']
};

const historySlice = createSlice({
    name: 'historySlice',
    initialState,
    reducers: {}
});

export const { /* экшены */ } = historySlice.actions; // Замените `/* экшены */` на имена экшенов, которые вы определяете внутри createSlice
export default historySlice.reducer;
