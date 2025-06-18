import {Outlet} from 'react-router';
import {useRef, useState} from 'react';
import Sidebar from '@organisms/Sidebar/Sidebar';
import Header from '@organisms/Header/Header';
import styles from '@layouts/MainLayout/MainLayout.module.css';
import useClickOutside from '@hooks/useClickOutside';
import useDataInit from '@hooks/useDataInit';
import useUserDataInit from '@hooks/useUserDataInit'; // TODO: Rewrite hooks, importing from index.ts
import useCalculatedPortfolio from '@hooks/useCalculatedPortfolio';
import {useAppSelector} from '@/store/hooks';
import {selectStocks} from '@/store/selectors/stocksSelectors';

const MainLayout = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navBtnRef = useRef<HTMLButtonElement>(null);

    const stocks = useAppSelector(selectStocks);

    useClickOutside([navBtnRef], () => setIsNavOpen(false));

    useDataInit();
    useUserDataInit();
    useCalculatedPortfolio();

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
                <main className={styles.main}>
                    <Outlet/>
                </main>
            </div>
        </>
    );
};

export default MainLayout;