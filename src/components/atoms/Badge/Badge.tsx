import type {BadgeProps} from '@atoms/Badge/Badge.props';
import styles from '@atoms/Badge/Badge.module.css';
import {OperationColor} from '@models';
import cn from 'classnames';
import {cloneElement} from 'react';

const Badge = ({text, icon, size = 'md', color = OperationColor.Gray, className}: BadgeProps) => {
    const iconElement = icon
    ? cloneElement(icon, { className: cn(icon.props.className, styles.icon) })
    : null;

    const classes = cn(
        className,
        styles.badge,
        styles[color],
        styles[size],
    );

    return (
        <div className={classes}>
            {iconElement}
            {text}
        </div>
    );
};

export default Badge;
