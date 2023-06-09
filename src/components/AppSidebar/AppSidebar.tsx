import { NavLink } from 'react-router-dom';
import styles from './AppSidebar.module.css';
import { ISidebar } from './AppSidebar.props';

const AppSidebar = ({ nav }: ISidebar) => {
    const navElements = nav.map(item => {
        return (
            <NavLink to={item.link} className={styles.link}>
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