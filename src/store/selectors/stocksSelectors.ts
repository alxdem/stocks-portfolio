import type {RootState} from '@/store/rootReducer.ts';
import {createSelector} from '@reduxjs/toolkit';

export const selectStocks = (state: RootState) => state.stocks.stocks;
export const selectDividendsInfo = (state: RootState) => state.stocks.dividends;
export const selectBetaInfo = (state: RootState) => state.stocks.beta;
export const selectSectors = (state: RootState) => state.stocks.sectors;

export const selectStocksArray = createSelector(
    [selectStocks],
    (stocks) => Object.values(stocks || {})
);