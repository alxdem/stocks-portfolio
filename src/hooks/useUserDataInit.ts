import {useAppDispatch} from '@/store/hooks';
import {fakeFetch} from '@/utils';
import {useEffect} from 'react';
import {setOperations} from '@/store/reducers/userSlice';
import {operations} from '@fixtures/dataUser1';
import {appKey} from '@utils/variables';

const useUserDataInit = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getFetch = async () => {
            const data = await fakeFetch(operations);

            dispatch(setOperations(data));
        }

        const cachedData = localStorage.getItem(appKey.OPERATIONS);
        const formattedData = cachedData ? JSON.parse(cachedData) : null;

        if (formattedData) {
            dispatch(setOperations(formattedData));
        } else {
            getFetch();
        }
    }, []);
};

export default useUserDataInit;