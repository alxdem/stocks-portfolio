import useFetch from '@hooks/useFetch';
import {appKey, STOCKS_EXTENDED_DATA_URL} from '@utils/variables';
import {useEffect, useState} from 'react';
import {createStocksObject} from '@/utils';
import type {TickerDataExtended} from "@models/index";
const useDataInit = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const cachedData = localStorage.getItem(appKey.LS_DATA);
    const isCached = Boolean(cachedData);

    const url = cachedData ? '' : STOCKS_EXTENDED_DATA_URL;
    const { data, isLoading } = useFetch<TickerDataExtended[]>(url, null);

    useEffect(() => {
        if (isCached) {
            setIsLoaded(true);
            return;
        }

        if (isLoading || !data) {
            return;
        }

        const stocksObject = createStocksObject(data);
        localStorage.setItem(appKey.LS_DATA, JSON.stringify(stocksObject));
        console.log('stocksObject', stocksObject);

        setIsLoaded(true);
    }, [isLoading, isCached, data]);

    return { isLoaded };
};

export default useDataInit;