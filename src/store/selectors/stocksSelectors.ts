import type {RootState} from '@/store/rootReducer.ts';

export const selectStocks = (state: RootState) => state.stocks.stocks;