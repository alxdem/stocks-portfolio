import {useState} from 'react';
import {useAppDispatch} from '@/store/hooks';
import type {Operation} from '@models';
import {fakeFetch, operationMessage} from '@utils';
import {addOperation as addOperationAction} from '@/store/reducers/userSlice';
import useAppToast from '@hooks/useAppToast';

const useAddOperation = () => {
    const dispatch = useAppDispatch();
    const {successMessage} = useAppToast();
    const [isLoading, setIsLoading] = useState(false);

    const addOperation = async (operation: Operation) => {
        setIsLoading(true);
        await fakeFetch(null);
        dispatch(addOperationAction(operation));
        setIsLoading(false);
        successMessage(operationMessage(operation));
    };


    return {
        isLoading,
        addOperation,
    }
};

export default useAddOperation;