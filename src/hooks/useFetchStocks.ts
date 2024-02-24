import { useState, useEffect } from 'react';
import { isSnP500Include } from '../utils/utils';
import { IStockExtendedInfo, IStockShortInfo } from '../models/common';

// TODO: Correct options: any
function useFetchStocks<T>(url: string, initialState: T, name: string): [T, boolean, string] {
    const [data, setData] = useState<T>(initialState);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const dataCache = name ? localStorage.getItem(name) : null;

        if (dataCache) {
            setData(JSON.parse(dataCache));
            return;
        }

        (async function () {
            try {
                setIsLoading(true);
                const res = await fetch(url);
                const dataRaw = await res.json();
                const filteredData = dataRaw.filter((item: IStockShortInfo | IStockExtendedInfo) => isSnP500Include(item.symbol));

                setData(filteredData);
                if (name) {
                    localStorage.setItem(name, JSON.stringify(filteredData));
                }
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
    }, [url, name]);

    return [data, isLoading, error];
}

export default useFetchStocks;