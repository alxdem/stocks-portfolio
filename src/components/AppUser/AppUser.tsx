import styles from './AppUser.module.css';
import { IUser } from './AppUser.props';

const AppUser = ({ name, photo }: IUser) => {
    const photoElement = photo ? <img className={styles.photo} src={photo} alt={name} /> : null;

    return (
        <div className={styles.user}>
            {photoElement}
            {name}
        </div>
    );
};

export default AppUser;