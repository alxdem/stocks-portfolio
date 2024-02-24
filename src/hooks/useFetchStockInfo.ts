import { useState, useEffect, useRef } from 'react';
import { ITickerPagePartial } from '../models/common';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getCompanyApiUrl } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { addStockExtended } from '../reducers/stocksSlice';

function useFetchStockInfo(symbol: string): [ITickerPagePartial, boolean, string] {
    const [data, setData] = useState<ITickerPagePartial>({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const stocksExtendedObject = useSelector((state: RootState) => state.stocks.stocksExtended);
    const dispatch = useDispatch();
    const tickerInfo = useRef<ITickerPagePartial>({});
    tickerInfo.current = stocksExtendedObject[symbol];

    useEffect(() => {
        (async function () {
            try {
                setIsLoading(true);
                if (!tickerInfo.current) {
                    const url = getCompanyApiUrl(symbol || '');
                    const res = await fetch(url);
                    const dataRaw = await res.json();
                    const element = dataRaw[0];
                    tickerInfo.current = element;
                    dispatch(addStockExtended(element));
                }

                setData(tickerInfo.current);
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
    }, [symbol]);

    return [data, isLoading, error];
}

export default useFetchStockInfo;