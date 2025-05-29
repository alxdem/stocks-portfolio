import {useAppDispatch} from '@/store/hooks';
import {fakeFetch} from '@/utils';
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

        getFetch();
    }, []);
};

export default useUserDataInit;