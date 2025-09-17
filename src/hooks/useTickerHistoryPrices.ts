import useFetch from '@hooks/useFetch';
import {CF_STOCK_HISTORY_URL, getHistoryPriceToCache, setHistoryPriceToCache} from '@utils';
import {useEffect, useState} from 'react';
import type {TickerHistoryItem, ChartPeriod, Nullable} from '@models';

const useTickerHistoryPrices = (name: string) => {
    const [period, setPeriod] = useState<ChartPeriod>('1mo');
    const [historyPrices, setHistoryPrices] = useState<Nullable<TickerHistoryItem[]>>();
    const [isLoading, setIsLoading] = useState(true);

    const historyInfo = getHistoryPriceToCache(name, period);

    const url = historyInfo ? '' : `${CF_STOCK_HISTORY_URL}/?ticker=${name}&period=${period}`;
    const {data, isLoading: isDataLoading} = useFetch<TickerHistoryItem[]>(url, null);

    useEffect(() => {
        if (historyInfo && historyInfo.length) {
            setHistoryPrices(historyInfo);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [period]);

    useEffect(() => {
        if (data && !isDataLoading) {
            setHistoryPrices(data);
            setHistoryPriceToCache(name, period, data);
            setIsLoading(false);
        }
    }, [data, isDataLoading]);

    return {period, setPeriod, historyPrices, isLoading};
};

export default useTickerHistoryPrices;