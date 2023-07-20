import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IHistoryRequests {
    history: Array<string>
}

const initialState:IHistoryRequests = {
    history: JSON.parse(localStorage.getItem('historyWords') || '')
};


const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addHistoryWord(state, action:PayloadAction<string>) {
            state.history.push(action.payload);
            localStorage.setItem('historyWords', JSON.stringify(state.history));
        },
        clearHistoryWord(state) {
            state.history = [];
            localStorage.setItem('historyWords', JSON.stringify(state.history));
        },
    },
});

export const { addHistoryWord, clearHistoryWord } = historySlice.actions;
export default historySlice.reducer;