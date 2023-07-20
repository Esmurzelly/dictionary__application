import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './popularRequests';
import favouritesReducer from './favouritesWords';

const store = configureStore({
    reducer: {
       popular: historyReducer,
       favourite: favouritesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store