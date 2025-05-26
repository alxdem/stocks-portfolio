import type {BadgeProps} from '@atoms/Badge/Badge.props';
import styles from '@atoms/Badge/Badge.module.css';
import {OperationColor} from '@/models';
import cn from 'classnames';
import {cloneElement} from "react";

const Badge = ({text, icon, color = OperationColor.Gray, className}: BadgeProps) => {
    const iconElement = icon
    ? cloneElement(icon, { className: styles.icon })
    : null;

    return (
        <div className={cn(className, styles.badge, styles[color])}>
            {iconElement}
            {text}
        </div>
    );
};

export default Badge;
