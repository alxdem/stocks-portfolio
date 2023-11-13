import { ILayout, IStockShortInfo } from '../../models/common';
import AppHeader from '../../components/AppHeader/AppHeader';
import styles from './MainLayout.module.css';
import AppSidebar from '../../components/AppSidebar/AppSidebar';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setStocks, setStocksExtend } from '../../reducers/stocksSlice';
import { STOCKS_DATA_URL, STOCKS_EXTENDED_DATA_URL } from '../../utils/variables';

const MainLayout = ({ children }: ILayout) => {
    const dispatch = useDispatch();
    const user = { name: 'Victor Monro', photo: 'uploads/user1.jpg' };
    const asideNav = [
        { id: 'i1', text: 'Dashboard', link: '/dashboard' },
        { id: 'i2', text: 'Portfolio', link: '/portfolio' },
        { id: 'i3', text: 'Operations', link: '/operations' },
        { id: 'i4', text: 'Analytics', link: '/analytics' },
        { id: 'i5', text: 'About', link: '/about' },
    ];

    const [stocksData, isStocksDataLoading, stocksDataError] = useFetch<IStockShortInfo[]>(STOCKS_DATA_URL, []);
    const [stocksExtendedData, isStocksExtendedDataLoading, stocksExtendedDataError] = useFetch<IStockShortInfo[]>(STOCKS_EXTENDED_DATA_URL, []);

    const getTickersListData = () => {
        if (stocksData.length) {
            const filteredData = stocksData.filter((item: IStockShortInfo) => {
                return item.exchangeShortName === 'NYSE' || item.exchangeShortName === "NASDAQ";
            });

            dispatch(setStocks(filteredData));
        }
    };

    const getTickersListExtendedData = () => {
        if (stocksExtendedData.length) {
            dispatch(setStocksExtend(stocksExtendedData));
        }
    };

    useEffect(() => {
        getTickersListData();
    }, [stocksData]);

    useEffect(() => {
        getTickersListExtendedData();
    }, [stocksExtendedData]);

    return (
        <>
            <AppHeader user={user} />
            <div className={styles.inner}>
                <AppSidebar nav={asideNav} />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </>
    );
};

export default MainLayout;