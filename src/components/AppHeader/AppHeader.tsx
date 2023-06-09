import { NavLink } from 'react-router-dom';
import styles from './AppHeader.module.css';
import { ReactComponent as LogoIcon } from './../../assets/svg/logo.svg';
import { ReactComponent as ModeIcon } from './../../assets/svg/mode.svg';
import AppUser from '../AppUser/AppUser';
import { IAppHeader } from './AppHeader.props';

const AppHeader = ({ user }: IAppHeader) => {
    const root = document.querySelector(':root');

    const themeChange = () => {
        root?.classList.toggle('dark');
    };

    return (
        <header className={styles.header}>
            <NavLink to='/' className={styles.logo}>
                <LogoIcon width={32} height={32} />
                Invest House
            </NavLink>

            <div className={styles.info}>
                <button onClick={themeChange} className={styles.button}>
                    <ModeIcon width={32} height={32} />
                </button>

                <AppUser name={user.name} photo={user.photo} />
            </div>
        </header>
    );
};

export default AppHeader;