import type {UserBadgeProps} from '@atoms/UserBadge/UserBadge.props';
import styles from '@atoms/UserBadge/UserBadge.module.css';
import cn from 'classnames';

const UserBadge = ({name, photo, className, ...restProps}: UserBadgeProps) => {
    const photoElement = photo ? <img className={styles.photo} src={photo} alt={name} /> : null;

    return (
        <div className={cn(className, styles.user)} {...restProps}>
            {photoElement}
            <span className={styles.name}>{name}</span>
        </div>
    );
}

export default UserBadge;