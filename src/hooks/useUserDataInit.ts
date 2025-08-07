import {useAppDispatch} from '@/store/hooks';
import {fakeFetch, getTotalFeeValue, appKey} from '@utils';
import {useEffect} from 'react';
import {setOperations, setTotalFee} from '@/store/reducers/userSlice';
import {operations} from '@fixtures/dataUser1';

const useUserDataInit = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getFetch = async () => {
            const data = await fakeFetch(operations);
            dispatch(setOperations(data));
            dispatch(setTotalFee(getTotalFeeValue(data)));
        }

        const cachedData = localStorage.getItem(appKey.OPERATIONS);

        if (cachedData) {
            const operations = JSON.parse(cachedData);
            dispatch(setOperations(operations));
            dispatch(setTotalFee(getTotalFeeValue(operations)));
        } else {
            getFetch();
        }
    }, []);
};

export default useUserDataInit;