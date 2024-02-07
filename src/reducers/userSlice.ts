import { createSlice } from '@reduxjs/toolkit';
import { ITikerListData } from '../models/common';
import { IOperation } from '../components/OperationCard/OperationCard.props';

interface IUserState {
    tickers: ITikerListData[];
    operations: IOperation[];

    isOperationsLoading: boolean;
}

const initialState: IUserState = {
    tickers: [],
    operations: [],

    isOperationsLoading: true,
};

function isTicker(element: ITikerListData): element is ITikerListData {
    return 'code' in element && 'value' in element;
}

function isOperation(element: unknown): element is IOperation {
    return typeof element === 'object' &&
        element !== null &&
        'symbol' in element &&
        'date' in element &&
        'price' in element &&
        'type' in element &&
        'value' in element;
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTickers: (state, action) => {
            state.tickers = action.payload;
        },
        addTicker: (state, action) => {
            if (isTicker(action.payload)) {
                state.tickers.push(action.payload);
            }
        },

        setOperations: (state, action) => {
            state.operations = action.payload;
            state.isOperationsLoading = false;
        },

        addOperation: (state, action) => {
            if (isOperation(action.payload)) {
                state.operations.push(action.payload);
            }
        }
    }
});

export const { setTickers, setOperations, addOperation } = userSlice.actions;
export default userSlice.reducer;