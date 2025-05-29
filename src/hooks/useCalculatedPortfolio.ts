import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {useEffect} from 'react';
import {getCalculatedPortfolio, getFormattedPortfolio} from '@utils/businessLogic';
import {setPortfolio, setFormattedPortfolio} from '@/store/reducers/userSlice';

const useCalculatedPortfolio = () => {
    const dispatch = useAppDispatch();
    const operations = useAppSelector(state => state.user.operations);
    const stockData = useAppSelector(state => state.stocks.stocks);

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