import { createSlice } from '@reduxjs/toolkit';
import { IStocksObject } from '../models/common';

interface IstocksState {
    stocks: IStocksObject;
}

const initialState: IstocksState = {
    stocks: {},
};

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action) => {
            state.stocks = action.payload;
        }
    }
});

export const { setStocks } = stocksSlice.actions;
export default stocksSlice.reducer;

