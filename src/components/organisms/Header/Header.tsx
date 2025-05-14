import styles from '@organisms/Header/Header.module.css';
import cn from 'classnames';
import {Link} from 'react-router';
import LogoUrl from '@images/logo.svg';
import ModeIcon from '@images/mode.svg?react';
import MenuIcon from '@images/menu.svg?react';
import CloseIcon from '@images/close.svg?react';
import type {HeaderProps} from '@organisms/Header/Header.props';
import UserBadge from '@atoms/UserBadge/UserBadge';

const Header = ({isNavOpen, navBtnRef, navBtnClick}: HeaderProps) => {
    const user = { name: 'Victor Monro', photo: 'uploads/user1.jpg' };

    const navBtnClasses = cn(
        styles.navButton,
        isNavOpen ? styles.navButtonActive : null
    );

    const themeChange = () => {
        // root?.classList.toggle('dark');
        console.log('themeChange');
    };

    return (
        <header className={styles.header}>
            <Link to='/' className={styles.logo}>
                <img src={LogoUrl} className={styles.logoIcon} alt=""/>
                <span className={styles.logoText}>Invest House</span>
            </Link>

            <div className={styles.info}>
                <button onClick={themeChange} className={styles.button}>
                    <ModeIcon className={styles.modeIcon}/>
                </button>

                <UserBadge className={styles.user} name={user.name} photo={user.photo}/>

                <button ref={navBtnRef} onClick={navBtnClick} className={navBtnClasses}>
                    <MenuIcon className={styles.navIconBurger}/>
                    <CloseIcon className={styles.navIconClose}/>
                </button>
            </div>
        </header>
    );
};

export default Header;