import { createSlice } from '@reduxjs/toolkit';
import { IDataTicker } from '../components/TickerList/TickerList.props';

interface IstocksState {
    stocks: IDataTicker[];
    stocksExtend: IDataTicker[];
}

const initialState: IstocksState = {
    stocks: [],
    stocksExtend: []
};

export const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action) => {
            state.stocks = action.payload;
        },
        setStocksExtend: (state, action) => {
            state.stocksExtend = action.payload;
        }
    }
});

export const { setStocks, setStocksExtend } = stocksSlice.actions;
export default stocksSlice.reducer;

