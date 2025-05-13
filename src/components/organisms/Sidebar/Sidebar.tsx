import cn from 'classnames';
import {NavLink} from 'react-router';
import styles from '@organisms/Sidebar/Sidebar.module.css';

const Sidebar = () => {
    const links = [
        { id: 'dashboard', text: 'Dashboard', link: '/dashboard' },
        { id: 'portfolio', text: 'Portfolio', link: '/portfolio' },
        { id: 'operations', text: 'Operations', link: '/operations' },
        { id: 'analytics', text: 'Analytics', link: '/analytics' },
        { id: 'stock', text: 'Stock', link: '/stock' },
        { id: 'about', text: 'About', link: '/about' },
    ];

    const namElements = links.map(item => (
        <NavLink
            key={item.id}
            to={item.link}
            className={({ isActive }) => cn(
                styles.link,
                isActive ? styles.active: null
            )}
        >
            {item.text}
        </NavLink>
    ));

    return (
        <aside
            className={styles.aside}
        >
            <nav className={styles.nav}>
                {namElements}
            </nav>
        </aside>
    );
};

export default Sidebar;