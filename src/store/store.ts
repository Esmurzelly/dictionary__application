import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './popularRequests';
import favouritesReducer from './favouritesWords';
import historyRequests from './historyRequests';

const store = configureStore({
    reducer: {
       popular: historyReducer,
       favourite: favouritesReducer,
       history: historyRequests
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store