import { combineReducers } from '@reduxjs/toolkit';
import stocksReducer from '@/store/reducers/stocksSlice';
import userReducer from '@/store/reducers/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
    stocks: stocksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;