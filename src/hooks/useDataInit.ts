import useFetch from '@hooks/useFetch';
import {CF_STOCK_LIST_URL, createStocksObject, getIndicatorsInfo, getSectorsObject} from '@utils';
import {useEffect, useState} from 'react';
import type {TickerDataExtended, TickersObject} from '@models';
import {useDispatch} from 'react-redux';
import {setStocks, setDividends, setSectors, setBetas} from '@/store/reducers/stocksSlice';

const useDataInit = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const {data, isLoading} = useFetch<TickerDataExtended[]>(CF_STOCK_LIST_URL, null);

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
        if (isLoading || !data) {
            return;
        }

        const stocksObject = createStocksObject(data);

        setData(stocksObject);
    }, [isLoading, data]);

    return {isLoaded};
};

export default useDataInit;