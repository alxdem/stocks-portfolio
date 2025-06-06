import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {UserState, Operation, StockPosition, StockPositionFormatted} from '@models';

const initialState: UserState = {
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
    },
});

export const {
    setOperations,
    addOperation,
    setPortfolio,
    setFormattedPortfolio,
} = userSlice.actions;

export default userSlice.reducer;