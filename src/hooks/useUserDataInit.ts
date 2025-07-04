import {useAppDispatch} from '@/store/hooks';
import {fakeFetch, appKey} from '@utils';
import {useEffect} from 'react';
import {setOperations} from '@/store/reducers/userSlice';
import {operations} from '@fixtures/dataUser1';

const useUserDataInit = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getFetch = async () => {
            const data = await fakeFetch(operations);
            dispatch(setOperations(data));
        }

        const cachedData = localStorage.getItem(appKey.OPERATIONS);

        if (cachedData) {
            dispatch(setOperations(JSON.parse(cachedData)));
        } else {
            getFetch();
        }
    }, []);
};

export default useUserDataInit;