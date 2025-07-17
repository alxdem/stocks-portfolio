import type {RootState} from '@/store/rootReducer.ts';

export const selectStocks = (state: RootState) => state.stocks.stocks;
export const selectDividendsInfo = (state: RootState) => state.stocks.dividends;
export const selectBetaInfo = (state: RootState) => state.stocks.beta;
export const selectSectors = (state: RootState) => state.stocks.sectors;