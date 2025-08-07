import {useState} from 'react';
import {useAppDispatch} from '@/store/hooks';
import type {Operation} from '@models';
import {fakeFetch, operationMessage, getOperationFee} from '@utils';
import {addOperation as addOperationAction, addFee} from '@/store/reducers/userSlice';
import useAppToast from '@hooks/useAppToast';

const useAddOperation = () => {
    const dispatch = useAppDispatch();
    const {successMessage} = useAppToast();
    const [isLoading, setIsLoading] = useState(false);

    const addOperation = async (operation: Operation) => {
        setIsLoading(true);
        await fakeFetch(null);
        dispatch(addOperationAction(operation));
        if (operation.type === 'sale' || operation.type === 'purchase') {
            dispatch(addFee(getOperationFee(operation.value * operation.price)));
        }
        setIsLoading(false);
        successMessage(operationMessage(operation));
    };


    return {
        isLoading,
        addOperation,
    }
};

export default useAddOperation;