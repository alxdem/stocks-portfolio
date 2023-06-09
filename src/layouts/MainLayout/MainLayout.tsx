import { ILayout } from '../../models/common';
import AppHeader from '../../components/AppHeader/AppHeader';
import styles from './MainLayout.module.css';
import AppSidebar from '../../components/AppSidebar/AppSidebar';

const MainLayout = ({ children }: ILayout) => {
    const user = { name: 'Victor Monro', photo: 'uploads/user1.jpg' };
    const asideNav = [
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'Operations', link: '/operations' },
        { text: 'Analytics', link: '/analytics' },
        { text: 'About', link: '/about' },
    ];

    return (
        <>
            <AppHeader user={user} />
            <div className={styles.inner}>
                <AppSidebar nav={asideNav} />
                <main>
                    {children}
                </main>
            </div>
        </>
    );
};

export default MainLayout;