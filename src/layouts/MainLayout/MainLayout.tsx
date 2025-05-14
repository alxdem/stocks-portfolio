import {Outlet} from 'react-router';
import {useRef, useState} from 'react';
import Sidebar from '@organisms/Sidebar/Sidebar';
import Header from '@organisms/Header/Header';
import styles from '@layouts/MainLayout/MainLayout.module.css';
import useClickOutside from '@hooks/useClickOutside';

const MainLayout = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navBtnRef = useRef<HTMLButtonElement>(null);

    useClickOutside([navBtnRef], () => setIsNavOpen(false));

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