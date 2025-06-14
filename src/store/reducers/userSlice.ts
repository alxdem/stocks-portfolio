import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {UserState, Operation, StockPosition, StockPositionFormatted} from '@models';
import {recalculateBalance, recalculateWorth} from '@/utils/businessLogic';

const initialState: UserState = {
    balance: 0, // cash
    assetsWorth: 0, // worth of all assets
    operations: null,
    portfolio: null,
    formattedPortfolio: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setOperations: (state, action: PayloadAction<Operation[]>) => {
            state.operations = action.payload;
            state.balance = recalculateBalance(state.operations);
        },
        addOperation: (state, action: PayloadAction<Operation>) => {
            state.operations = state.operations || [];
            state.operations.push(action.payload);
            state.balance = recalculateBalance(state.operations);
        },
        setPortfolio: (state, action: PayloadAction<StockPosition[]>) => {
            state.portfolio = action.payload;
            state.assetsWorth = recalculateWorth(state.portfolio);
        },
        setFormattedPortfolio: (state, action: PayloadAction<StockPositionFormatted[]>) => {
            state.formattedPortfolio = action.payload;
        },
    },
});

export const {
    setOperations,
    addOperation,
    setPortfolio,
    setFormattedPortfolio,
} = userSlice.actions;

export default userSlice.reducer;