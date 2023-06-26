import { NavLink } from 'react-router-dom';
import styles from './AppSidebar.module.css';
import { ISidebar } from './AppSidebar.props';
import cn from 'classnames';

const AppSidebar = ({ nav }: ISidebar) => {
    const navElements = nav.map(item => {
        return (
            <NavLink key={item.id} to={item.link} className={({ isActive }) => cn(
                styles.link,
                isActive ? styles.linkActive : null
            )}>
                {item.text}
            </NavLink>
        );
    });

    return (
        <aside className={styles.aside}>
            <nav className={styles.nav}>
                {navElements}
            </nav>
        </aside>
    );
};

export default AppSidebar;