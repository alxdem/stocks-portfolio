import { createSlice } from '@reduxjs/toolkit';
import { IStocksObject } from '../models/common';

interface IstocksState {
    stocks: IStocksObject;
    isLoading: boolean;
}

const initialState: IstocksState = {
    stocks: {},
    isLoading: true,
};

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action) => {
            state.stocks = action.payload;
            state.isLoading = false;
        }
    }
});

export const { setStocks } = stocksSlice.actions;
export default stocksSlice.reducer;

