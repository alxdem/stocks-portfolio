import { ILayout } from '../../models/common';
import AppHeader from '../../components/AppHeader/AppHeader';
import styles from './MainLayout.module.css';
import AppSidebar from '../../components/AppSidebar/AppSidebar';

const MainLayout = ({ children }: ILayout) => {
    const user = { name: 'Victor Monro', photo: 'uploads/user1.jpg' };
    const asideNav = [
        { id: 'i1', text: 'Dashboard', link: '/dashboard' },
        { id: 'i2', text: 'Operations', link: '/operations' },
        { id: 'i3', text: 'Analytics', link: '/analytics' },
        { id: 'i4', text: 'About', link: '/about' },
    ];

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