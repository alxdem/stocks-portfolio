import styles from './AppUser.module.css';
import { IUser } from './AppUser.props';
import cn from 'classnames';

const AppUser = ({ name, photo, className, ...restProps }: IUser) => {
    const photoElement = photo ? <img className={styles.photo} src={photo} alt={name} /> : null;

    return (
        <div className={cn(className, styles.user)} {...restProps}>
            {photoElement}
            {name}
        </div>
    );
};

export default AppUser;