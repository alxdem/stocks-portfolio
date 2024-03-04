import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStocksObject, IStocksExtendedObject, ITickerPagePartial } from '@models/common';

interface IstocksState {
    stocks: IStocksObject;
    stocksExtended: IStocksExtendedObject;
    isLoading: boolean;
}

const initialState: IstocksState = {
    stocks: {},
    stocksExtended: {},
    isLoading: true,
};

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action: PayloadAction<IStocksObject>) => {
            state.stocks = action.payload;
            state.isLoading = false;
        },
        addStockExtended: (state, action: PayloadAction<ITickerPagePartial>) => {
            const symbol = action.payload.symbol;
            if (symbol) {
                state.stocksExtended[symbol] = action.payload;
            }
        },
    }
});

export const { setStocks, addStockExtended } = stocksSlice.actions;
export default stocksSlice.reducer;

