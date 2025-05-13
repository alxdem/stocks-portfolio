import {Outlet} from 'react-router';
import Sidebar from '@organisms/Sidebar/Sidebar';
import styles from '@layouts/MainLayout/MainLayout.module.css';

const MainLayout = () => {
    return (
        <>
            <header>
                Header
            </header>
            <div className={styles.inner}>
                <Sidebar />
                <main>
                    <h1>MainLayout</h1>
                    <Outlet/>
                </main>
            </div>
        </>
    );
};

export default MainLayout;