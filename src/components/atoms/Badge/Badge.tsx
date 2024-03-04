import { IBadge } from '@atoms/Badge/Badge.props';
import styles from '@atoms/Badge/Badge.module.css';
import cn from 'classnames';
import { OperationColor } from '@models/common';

const Badge = ({ icon, text, color = OperationColor.Gray, className }: IBadge): JSX.Element => {
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