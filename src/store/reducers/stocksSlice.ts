import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {TickersObject, StoreStocksState} from '@models';

const initialState: StoreStocksState = {
    stocks: null,
};

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action: PayloadAction<TickersObject>) => {
            state.stocks = action.payload;
        }
    }
});

export const {setStocks} = stocksSlice.actions;
export default stocksSlice.reducer;