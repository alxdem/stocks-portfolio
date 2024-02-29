import { ILayout, IStockExtendedInfo, IStockShortInfo } from '../../models/common';
import AppHeader from '../../components/organisms/AppHeader/AppHeader';
import styles from './MainLayout.module.css';
import AppSidebar from '../../components/organisms/AppSidebar/AppSidebar';
import useFetchStocks from '../../hooks/useFetchStocks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStocks } from '../../reducers/stocksSlice';
import { setOperations } from '../../reducers/userSlice';
import { STOCKS_DATA_URL, STOCKS_EXTENDED_DATA_URL } from '../../utils/variables';
import { createStocksObject } from '../../utils/utils';
import { operations } from '../../assets/fixtures/dataUser1';

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

    const [stocksData] = useFetchStocks<IStockShortInfo[]>(STOCKS_DATA_URL, [], 'stockData');
    const [stocksExtendedData] = useFetchStocks<IStockExtendedInfo[]>(STOCKS_EXTENDED_DATA_URL, [], 'stocksExtendedData');

    Promise.all([stocksData, stocksExtendedData])
        .then(([stockData, extendedData]) => {
            if (stockData.length && extendedData.length && operations.length) {
                dispatch(setStocks(createStocksObject(stockData, extendedData)));
            }
        })
        .catch((error: any) => {
            console.warn('ER', error);
            throw new Error(error);
        });

    dispatch(setOperations(operations));

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