import type {BadgeGainProps} from '@molecules/BadgeGain/BadgeGain.props';
import styles from '@molecules/BadgeGain/BadgeGain.module.css';
import Badge from '@atoms/Badge/Badge';
import ArrowIcon from '@images/arrow-circle.svg?react';
import cn from 'classnames';
import type {OperationColorCode} from '@models';

const BadgeGain = ({value, size, className}: BadgeGainProps) => {
    let color: OperationColorCode = 'gray';
    let iconClass = null;
    const text = `${Math.abs(value).toFixed(2)}%`;

    if (value > 0) {
        color = 'green';
        iconClass = styles.rise;
    }

    if (value < 0) {
        color = 'red';
        iconClass = styles.fall;
    }

    return (
        <Badge
            className={cn(styles.badgeGain, className)}
            text={text}
            icon={<ArrowIcon className={cn(styles.icon, iconClass)}/>}
            color={color}
            size={size}
        />
    );
};

export default BadgeGain;
