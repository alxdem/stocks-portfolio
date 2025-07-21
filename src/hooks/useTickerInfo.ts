import useFetch from '@hooks/useFetch';
import {TICKER_DATA_URL, getCompanyFromCache, setCompanyToCache} from '@utils';
import type {CompanyInfoData, Nullable} from '@models';
import {useEffect, useState} from 'react';

const useTickerInfo = (name: string) => {
    const companyInfo = getCompanyFromCache(name);
    const [info, setInfo] = useState<Nullable<CompanyInfoData>>();
    const [isLoading, setIsLoading] = useState(true);

    const url = companyInfo ? '' : TICKER_DATA_URL + name;
    const {data} = useFetch<CompanyInfoData[]>(url, null);

    useEffect(() => {
        if (companyInfo) {
            setInfo(companyInfo);
            setIsLoading(false);

            return;
        }

        const tickerInfo = data ? data[0] : null;

        if (tickerInfo) {
            setInfo(tickerInfo);
            setCompanyToCache(name, tickerInfo);
            setIsLoading(false);
        }
    }, [data]);

    return {info, isLoading};
};

export default useTickerInfo;