import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const removeDublicates = (array: string[]):string[] => {
  return [...new Set(array)]
}


interface IHistoryRequests {
    history: Array<string>
}

const storedHistory = localStorage.getItem('historyWords');
let parsedHistory: Array<string> = [];

if (storedHistory) {
    try {
      parsedHistory = JSON.parse(storedHistory);
    } catch (error) {
      console.error('Ошибка при разборе JSON:', error);
    }
  }

  const initialState: IHistoryRequests = {
    history: removeDublicates(parsedHistory),
};


const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addHistoryWord(state, action:PayloadAction<string>) {
            state.history.push(action.payload.toLowerCase());
            state.history = removeDublicates(state.history);
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