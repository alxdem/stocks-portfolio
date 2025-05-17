import {Outlet} from 'react-router';
import {useRef, useState} from 'react';
import Sidebar from '@organisms/Sidebar/Sidebar';
import Header from '@organisms/Header/Header';
import styles from '@layouts/MainLayout/MainLayout.module.css';
import useClickOutside from '@hooks/useClickOutside';
import useDataInit from '@hooks/useDataInit';
import {useSelector} from 'react-redux';
import type {StoreStocksState} from '@/models';

const MainLayout = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navBtnRef = useRef<HTMLButtonElement>(null);
    const stocks = useSelector((state: StoreStocksState) => state.stocks.stocks);

    useClickOutside([navBtnRef], () => setIsNavOpen(false));

    useDataInit();

    console.log('stocks', stocks);

    return (
        <>
            <Header
                isNavOpen={isNavOpen}
                navBtnClick={() => setIsNavOpen(state => !state)}
                navBtnRef={navBtnRef}
            />
            <div className={styles.inner}>
                <Sidebar
                    isOpen={isNavOpen}
                />
                <main>
                    <h1>MainLayout</h1>
                    <Outlet/>
                </main>
            </div>
        </>
    );
};

export default MainLayout;