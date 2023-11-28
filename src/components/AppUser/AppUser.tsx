import styles from './AppUser.module.css';
import { IUser } from './AppUser.props';

const AppUser = ({ name, photo, ...restProps }: IUser) => {
    const photoElement = photo ? <img className={styles.photo} src={photo} alt={name} /> : null;

    return (
        <div className={styles.user} {...restProps}>
            {photoElement}
            {name}
        </div>
    );
};

export default AppUser;