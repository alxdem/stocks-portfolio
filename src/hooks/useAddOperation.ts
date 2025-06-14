import {useState} from 'react';
import {useAppDispatch} from '@/store/hooks';
import type {Operation} from '@models';
import {fakeFetch} from '@/utils';
import {addOperation as addOperationAction} from '@/store/reducers/userSlice';

const useAddOperation = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const addOperation = async (operation: Operation) => {
        setIsLoading(true);
        await fakeFetch(null);
        dispatch(addOperationAction(operation));

        setIsLoading(false);

        return `You bought ${operation.value} shares for $${operation.value * operation.price}`;
    };


    return {
        isLoading,
        addOperation,
    }
};

export default useAddOperation;