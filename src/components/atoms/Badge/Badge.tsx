import { IBadge } from './Badge.props';
import { OperationColor } from '../../../models/common';
import styles from './Badge.module.css';
import cn from 'classnames';

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