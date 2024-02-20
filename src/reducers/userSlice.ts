import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITikerListData } from '../models/common';
import { IOperation } from '../components/OperationCard/OperationCard.props';
import { isTicker, isOperation, getBalanceCalculated, getTotalGain, getTotalCash } from '../utils/businessLogic';
import { setStocks } from './stocksSlice';
import { getCalculatedPortfolio } from '../utils/businessLogic';
import { ITickerExtendedCard } from '../components/TickerExtendedCard/TickerExtendedCard.props';

interface IUserState {
    tickers: ITikerListData[];
    operations: IOperation[];
    portfolio: ITickerExtendedCard[];
    balance: number;
    gain: number;
    gainPercent: number;
    cash: number;

    isOperationsLoading: boolean;
}

const initialState: IUserState = {
    tickers: [],
    operations: [],
    portfolio: [],
    balance: 0,
    gain: 0,
    gainPercent: 0,
    cash: 0,

    isOperationsLoading: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTickers: (state, action: PayloadAction<ITikerListData[]>) => {
            state.tickers = action.payload;
        },
        addTicker: (state, action: PayloadAction<ITikerListData>) => {
            if (isTicker(action.payload)) {
                state.tickers.push(action.payload);
            }
        },

        setOperations: (state, action: PayloadAction<IOperation[]>) => {
            state.operations = action.payload;
            state.isOperationsLoading = false;
        },

        addOperation: (state, action: PayloadAction<IOperation>) => {
            if (isOperation(action.payload)) {
                state.operations.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setStocks, (state, action) => {
            state.portfolio = getCalculatedPortfolio(state.operations, action.payload);
            state.balance = getBalanceCalculated(state.portfolio);
            state.gain = getTotalGain(state.portfolio, state.balance);
            state.cash = getTotalCash(state.operations);
        });
    },
});

export const { setTickers, setOperations, addOperation } = userSlice.actions;
export default userSlice.reducer;