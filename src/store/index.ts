import { configureStore } from '@reduxjs/toolkit';
import userMiddleware from '@/store/middlewares/userMiddleware';
import rootReducer from '@/store/rootReducer';

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(userMiddleware);
   },
});

export type AppDispatch = typeof store.dispatch;