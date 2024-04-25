import { NavLink } from 'react-router-dom';
import styles from '@organisms/AppSidebar/AppSidebar.module.css';
import { ISidebar } from '@organisms/AppSidebar/AppSidebar.props';
import cn from 'classnames';
import { forwardRef } from 'react';

const AppSidebar = forwardRef<HTMLElement, ISidebar>((props: ISidebar, ref) => {
    const { nav, isOpen } = props;
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
        <aside
            ref={ref}
            className={cn(
                styles.aside,
                isOpen ? styles.active : null
            )}
        >
            <nav className={styles.nav}>
                {navElements}
            </nav>
        </aside>
    );
});

export default AppSidebar;