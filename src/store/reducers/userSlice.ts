import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {UserState, Operation} from '@models';

const initialState: UserState = {
    operations: null,
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
    }
});

export const {
    setOperations,
    addOperation,
} = userSlice.actions;

export default userSlice.reducer;