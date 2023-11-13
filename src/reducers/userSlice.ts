import { createSlice } from '@reduxjs/toolkit';
import { ITikerListData } from '../models/common';

interface IUserState {
    tickers: ITikerListData[];
}

const initialState: IUserState = {
    tickers: []
};

function isTicker(element: ITikerListData): element is ITikerListData {
    return 'code' in element && 'value' in element;
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
        }
    }
});

export const { setTickers } = userSlice.actions;
export default userSlice.reducer;