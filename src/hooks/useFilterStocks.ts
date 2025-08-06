import {useAppSelector} from '@/store/hooks';
import {selectStocksArray} from '@/store/selectors/stocksSelectors';
import {useEffect, useState} from 'react';
import type {SortOrder, SortType, TickerInfo, DoubleRange} from '@models';
import {getMinMaxPriceFromStocksArray} from '@utils';

const useFilterStocks = (allSectorsKey: string) => {
    const stockArray = useAppSelector(selectStocksArray);
    const [sort, setSort] = useState<SortType>('symbol');
    const [order, setOrder] = useState<SortOrder>('asc');
    const [filterSector, setFilterSector] = useState<string>(allSectorsKey);
    const [price, setPrice] = useState<DoubleRange>(null);
    const [minMax, setMinMax] = useState<DoubleRange>(null);
    const [currentArray, setCurrentArray] = useState<TickerInfo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const sortStockArray = (array: TickerInfo[]) => {
        return [...array].sort((a, b) => {
            const keyA = a[sort];
            const keyB = b[sort];

            if (typeof keyA === 'string' && typeof keyB === 'string') {
                return order === 'asc'
                    ? keyA.localeCompare(keyB, 'en')
                    : keyB.localeCompare(keyA, 'en');
            }

            if (typeof keyA === 'number' && typeof keyB === 'number') {
                return order === 'asc' ? keyA - keyB : keyB - keyA;
            }

            return 0;
        });
    }

    const reset = () => {
        setFilterSector(allSectorsKey);
        setPrice(minMax);
    };

    useEffect(() => {
        const minMaxPrice = getMinMaxPriceFromStocksArray(stockArray);

        if (minMaxPrice === null) {
            return;
        }

        setMinMax(minMaxPrice);
        setPrice(minMaxPrice);
    }, [stockArray]);

    useEffect(() => {
        if (price === null) {
            return;
        }

        const newArray = [...stockArray].filter(item => {
            const sectorMatch = filterSector === allSectorsKey || item.sector === filterSector;
            const priceMatch = item.price >= price[0] && item.price <= price[1];

            return sectorMatch && priceMatch;
        });
        const sortedArray = sortStockArray(newArray);
        setCurrentArray(sortedArray);
        setIsLoaded(true);
    }, [stockArray, filterSector, price, sort, order]);

    return {
        currentArray,
        isLoaded,
        order,
        sort,
        filterSector,
        price,
        minMax,
        setSort,
        setOrder,
        setFilterSector,
        setPrice,
        reset,
    };
};

export default useFilterStocks;