import { IBadge, BadgeColor } from './Badge.props';
import styles from './Badge.module.css';
import cn from 'classnames';

const Badge = ({ icon, text, color = BadgeColor.Gray, className }: IBadge): JSX.Element => {
    return (
        <div className={cn(className, styles.badge, styles[color])}>
            <div className={styles.icon}>
                {icon}
            </div>
            {text}
        </div>
    )
};

export default Badge;