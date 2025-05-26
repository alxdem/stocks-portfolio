import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from '@/store/reducers/stocksSlice';
import userReducer from '@/store/reducers/userSlice';

export const store = configureStore({
   reducer: {
      stocks: stocksReducer,
      user: userReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;