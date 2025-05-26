import {useEffect, useState} from 'react';
import type {Nullable} from '@/models';

const useFetch = <T>(url: string, initialState: Nullable<T>, options: RequestInit = {}) => {
    const [data, setData] = useState<Nullable<T>>(initialState);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (url === '') {
            return;
        }

        let ignore = false;

        const getFetch = async () => {
            try {
                setIsLoading(true);
                setError('');
                const res = await fetch(url, options);

                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();

                if (!ignore) {
                    setData(data);
                }
            } catch (error: unknown) {
                if (!ignore) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    setError(message);
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        getFetch();

        return () => {
            ignore = true;
        }
    }, [url]);

    return {data, isLoading, error};
};

export default useFetch;