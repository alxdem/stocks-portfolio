import type { Middleware } from '@reduxjs/toolkit';
import {setOperations, addOperation} from '@/store/reducers/userSlice';
import type {RootState} from '@/store/rootReducer';
import {appKey} from '@utils/variables';

const userMiddleware: Middleware<'', RootState> = store => next => action => {
    const result = next(action);

    if (setOperations.match(action)) {
        localStorage.setItem(appKey.OPERATIONS, JSON.stringify(action.payload));
    }

    if (addOperation.match(action)) {
        const state = store.getState();
        localStorage.setItem(appKey.OPERATIONS, JSON.stringify(state.user.operations));
    }

    return result;
};

export default userMiddleware;