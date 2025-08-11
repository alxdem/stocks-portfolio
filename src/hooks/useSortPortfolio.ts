import {useAppSelector} from '@/store/hooks';
import {selectPortfolio} from '@/store/selectors/userSelectors';
import {useEffect, useState} from 'react';
import type {PortfolioSortType, SortOrder, Nullable, StockPositionFormatted} from '@models';
import {getFormattedPortfolio} from '@utils';

const useSortPortfolio = () => {
    const portfolio = useAppSelector(selectPortfolio);
    const [sort, setSort] = useState<PortfolioSortType>('symbol');
    const [order, setOrder] = useState<SortOrder>('asc');
    const [currentArray, setCurrentArray] = useState<Nullable<StockPositionFormatted[]>>(null);

    useEffect(() => {
        if (!portfolio) {
            return;
        }

        const isAscOrder = order === 'asc';

        const sortedPortfolio = [...portfolio].sort((a, b) => {
            if (sort === 'total') {
                return isAscOrder
                    ? a.value * a.price - b.value * b.price
                    : b.value * b.price - a.value * a.price;
            }

            if (sort === 'symbol') {
                return isAscOrder
                    ? a.symbol.localeCompare(b.symbol)
                    : b.symbol.localeCompare(a.symbol);
            }

            if (sort === 'gain') {
                return isAscOrder
                    ? a.gain - b.gain
                    : b.gain - a.gain;
            }

            return 0;
        });

        setCurrentArray(getFormattedPortfolio(sortedPortfolio));
    }, [portfolio, order, sort]);

    return {
        currentArray,
        order,
        sort,
        setSort,
        setOrder,
    }
};

export default useSortPortfolio;