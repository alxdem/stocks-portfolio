import { NavLink } from 'react-router-dom';
import styles from '@organisms/AppHeader/AppHeader.module.css';
import { ReactComponent as LogoIcon } from '@svg/logo.svg';
import { ReactComponent as ModeIcon } from '@svg/mode.svg';
import { ReactComponent as MenuIcon } from '@svg/menu.svg';
import { ReactComponent as CloseIcon } from '@svg/close.svg';
import { IAppHeader } from '@organisms/AppHeader/AppHeader.props';
import cn from 'classnames';
import AppUser from '@atoms/AppUser/AppUser';
import { forwardRef } from 'react';

const AppHeader = forwardRef<HTMLButtonElement, IAppHeader>(({ user, isNavOpen, navBtnClick, refNavBtn }: IAppHeader) => {
    const root = document.querySelector(':root') as HTMLElement;

    const themeChange = () => {
        root?.classList.toggle('dark');
    };

    const navBtnClasses = cn(
        styles.navButton,
        isNavOpen ? styles.navButtonActive : null
    );

    return (
        <header className={styles.header}>
            <NavLink to='/' className={styles.logo}>
                <LogoIcon className={styles.logoIcon} />
                <span className={styles.logoText}>Invest House</span>
            </NavLink>

            <div className={styles.info}>
                <button onClick={themeChange} className={styles.button}>
                    <ModeIcon className={styles.modeIcon} />
                </button>

                <AppUser className={styles.user} name={user.name} photo={user.photo} />

                <button ref={refNavBtn} onClick={navBtnClick} className={navBtnClasses}>
                    <MenuIcon className={styles.navIcon} />
                    <CloseIcon className={styles.navIconClose} />
                </button>
            </div>
        </header>
    );
});

export default AppHeader;