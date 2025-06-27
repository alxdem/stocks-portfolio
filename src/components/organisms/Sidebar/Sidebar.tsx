import cn from 'classnames';
import {NavLink} from 'react-router';
import styles from '@organisms/Sidebar/Sidebar.module.css';
import type {SidebarProps} from '@organisms/Sidebar/Sidebar.props';

const Sidebar = ({isOpen}: SidebarProps) => {
    const links = [
        { id: 'dashboard', text: 'Dashboard', link: '/dashboard' },
        { id: 'portfolio', text: 'Portfolio', link: '/portfolio' },
        { id: 'operations', text: 'Operations', link: '/operations' },
        { id: 'analytics', text: 'Analytics', link: '/analytics' },
        { id: 'stock', text: 'Stock', link: '/stock' },
        { id: 'about', text: 'About', link: '/about' },
        { id: 'deposit', text: 'Deposit', link: '/deposit' },
    ];

    const classes = cn(
        styles.aside,
        isOpen ? styles.active : null
    );

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
            className={classes}
        >
            <nav className={styles.nav}>
                {namElements}
            </nav>
        </aside>
    );
};

export default Sidebar;