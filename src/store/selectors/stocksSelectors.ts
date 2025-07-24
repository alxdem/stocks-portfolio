import type {RootState} from '@/store/rootReducer.ts';
import {createSelector} from '@reduxjs/toolkit';

export const selectStocks = (state: RootState) => state.stocks.stocks;
export const selectDividendsInfo = (state: RootState) => state.stocks.dividends;
export const selectBetaInfo = (state: RootState) => state.stocks.beta;
export const selectSectors = (state: RootState) => state.stocks.sectors;

export const selectStocksArray = createSelector(
    [selectStocks],
    (stocks) => {
        const array = Object.values(stocks || {});
        array.sort((a, b) => a.symbol.localeCompare(b.symbol, 'en'));

        return array;
    }
);

export const selectSectorsName = createSelector(
    [selectSectors],
    (sectors) => {
        if (!sectors) {
            return [];
        }

        const array = Object.keys(sectors);

        return array.sort((a, b) => a.localeCompare(b));
    }
);