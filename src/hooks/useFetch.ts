import { useState, useEffect } from 'react';
// TODO: Correct options: any
function useFetch<T>(url: string, initialState: T, options?: any): [T, boolean, string] {
    const [data, setData] = useState<T>(initialState);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                setIsLoading(true);
                const res = await fetch(url, options);
                const data = await res.json();
                setData(data);
            } catch (error: unknown) {
                if (typeof error === 'string') {
                    setError(error);
                } else if (error instanceof TypeError) {
                    setError(error.message);
                }
                console.log('Error:', error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [url, options]);

    return [data, isLoading, error];
}

export default useFetch;