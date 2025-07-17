import useFetch from '@hooks/useFetch';
import {appKey, STOCKS_EXTENDED_DATA_URL, createStocksObject, getIndicatorsInfo, getSectorsObject} from '@utils';
import {useEffect, useState} from 'react';
import type {TickerDataExtended, TickersObject} from '@models';
import {useDispatch} from 'react-redux';
import {setStocks, setDividends, setSectors, setBetas} from '@/store/reducers/stocksSlice';

const useDataInit = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const cachedData = localStorage.getItem(appKey.LS_DATA);
    const isCached = Boolean(cachedData);

    const url = cachedData ? '' : STOCKS_EXTENDED_DATA_URL;
    const {data, isLoading} = useFetch<TickerDataExtended[]>(url, null);

    const setData = (stocksObject: TickersObject) => {
        const sectors = getSectorsObject(stocksObject);
        const {
            betas,
            dividends,
        } = getIndicatorsInfo(stocksObject);

        dispatch(setStocks(stocksObject));
        dispatch(setDividends(dividends));
        dispatch(setBetas(betas));
        dispatch(setSectors(sectors));
        setIsLoaded(true);
    }

    useEffect(() => {
        if (isCached && cachedData) {
            const stocksObject: TickersObject = JSON.parse(cachedData);

            setData(stocksObject);

            return;
        }

        if (isLoading || !data) {
            return;
        }

        const stocksObject = createStocksObject(data);

        setData(stocksObject);
        localStorage.setItem(appKey.LS_DATA, JSON.stringify(stocksObject));
    }, [isLoading, isCached, data]);

    return {isLoaded};
};

export default useDataInit;