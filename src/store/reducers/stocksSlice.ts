import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {TickersObject, StoreStocksState, MinAvgMax, SectorsObject} from '@models';

const initialState: StoreStocksState = {
    stocks: null,
    sectors: null,
    dividends: null,
    beta: null,
};

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action: PayloadAction<TickersObject>) => {
            state.stocks = action.payload;
        },
        setSectors: (state, action: PayloadAction<SectorsObject>) => {
            state.sectors = action.payload;
        },
        setDividends: (state, action: PayloadAction<MinAvgMax>) => {
            state.dividends = action.payload;
        },
        setBetas: (state, action: PayloadAction<MinAvgMax>) => {
            state.beta = action.payload;
        },
    }
});

export const {
    setStocks,
    setSectors,
    setBetas,
    setDividends,
} = stocksSlice.actions;
export default stocksSlice.reducer;