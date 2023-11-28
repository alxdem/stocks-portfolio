import { ILayout, IStockShortInfo } from '../../models/common';
import AppHeader from '../../components/AppHeader/AppHeader';
import styles from './MainLayout.module.css';
import AppSidebar from '../../components/AppSidebar/AppSidebar';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStocks, setStocksExtend } from '../../reducers/stocksSlice';
import { STOCKS_DATA_URL, STOCKS_EXTENDED_DATA_URL } from '../../utils/variables';

const MainLayout = ({ children }: ILayout) => {
    const dispatch = useDispatch();
    const user = { name: 'Victor Monro', photo: 'uploads/user1.jpg' };
    const asideNav = [
        { id: 'dashboard', text: 'Dashboard', link: '/dashboard' },
        { id: 'portfolio', text: 'Portfolio', link: '/portfolio' },
        { id: 'operations', text: 'Operations', link: '/operations' },
        { id: 'analytics', text: 'Analytics', link: '/analytics' },
        { id: 'stock', text: 'Stock', link: '/stock' },
        { id: 'about', text: 'About', link: '/about' },
    ];

    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

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
            // TODO: Rewrite raw result into object {tikerName: {...options}}
            // TODO: Maybe unite two objects (stocksData and ExtendedData) into one
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
            <AppHeader
                user={user}
                isNavOpen={isNavOpen}
                navBtnClick={() => setIsNavOpen(!isNavOpen)}
            />
            <div className={styles.inner}>
                <AppSidebar nav={asideNav} isOpen={isNavOpen} />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </>
    );
};

export default MainLayout;