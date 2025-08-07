import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {UserState, Operation, StockPosition, StockPositionFormatted} from '@models';

const initialState: UserState = {
    operations: null,
    portfolio: null,
    formattedPortfolio: null,
    totalFee: 0,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setOperations: (state, action: PayloadAction<Operation[]>) => {
            state.operations = action.payload;
        },
        addOperation: (state, action: PayloadAction<Operation>) => {
            state.operations = state.operations || [];
            state.operations.push(action.payload);
        },
        setPortfolio: (state, action: PayloadAction<StockPosition[]>) => {
            state.portfolio = action.payload;
        },
        setFormattedPortfolio: (state, action: PayloadAction<StockPositionFormatted[]>) => {
            state.formattedPortfolio = action.payload;
        },
        setTotalFee: (state, action: PayloadAction<number>) => {
            state.totalFee = action.payload;
        },
        addFee: (state, action: PayloadAction<number>) => {
            state.totalFee = state.totalFee + action.payload;
        },
    },
});

export const {
    setOperations,
    addOperation,
    setPortfolio,
    setFormattedPortfolio,
    setTotalFee,
    addFee,
} = userSlice.actions;

export default userSlice.reducer;