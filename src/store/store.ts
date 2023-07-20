import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './historyRequests';

const store = configureStore({
    reducer: {
       history: historyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store