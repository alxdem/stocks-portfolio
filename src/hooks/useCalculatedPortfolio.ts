import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {useEffect} from 'react';
import {getCalculatedPortfolio, getFormattedPortfolio} from '@utils/businessLogic';
import {setPortfolio, setFormattedPortfolio} from '@/store/reducers/userSlice';
import {selectOperations} from '@/store/selectors/userSelectors';
import {selectStocks} from '@/store/selectors/stocksSelectors';

const useCalculatedPortfolio = () => {
    const dispatch = useAppDispatch();
    const operations = useAppSelector(selectOperations);
    const stockData = useAppSelector(selectStocks);

    useEffect(() => {
        if (!stockData || !operations || operations.length === 0) {
            return;
        }

        const portfolio = getCalculatedPortfolio(operations, stockData);
        const formattedPortfolio = getFormattedPortfolio(portfolio);
        dispatch(setPortfolio(portfolio));
        dispatch(setFormattedPortfolio(formattedPortfolio));
    }, [operations, stockData]);
};

export default useCalculatedPortfolio;