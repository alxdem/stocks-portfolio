import {useAppDispatch} from '@/store/hooks';
import {fakeFetch, sortOperations, appKey} from '@utils';
import {useEffect} from 'react';
import {setOperations} from '@/store/reducers/userSlice';
import {operations} from '@fixtures/dataUser1';

const useUserDataInit = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getFetch = async () => {
            const data = await fakeFetch(operations);
            const sortedData = sortOperations(data);

            dispatch(setOperations(sortedData));
        }

        const cachedData = localStorage.getItem(appKey.OPERATIONS);

        if (cachedData) {
            const sortedData = sortOperations(JSON.parse(cachedData));

            dispatch(setOperations(sortedData));
        } else {
            getFetch();
        }
    }, []);
};

export default useUserDataInit;