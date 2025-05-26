import type {OperationCardDesktopProps} from '@organisms/OperationCard/OperationCardDesktop/OperationCardDesktop.props';
import cn from 'classnames';
import styles from '@organisms/OperationCard/OperationCardDesktop/OperationCardDesktop.module.css';
import TickerCardInfo from '@molecules/TickerCardInfo/TickerCardInfo.tsx';
import Badge from '@atoms/Badge/Badge.tsx';
import DollarIcon from '@images/dollar-circle.svg?react';
import DiamondIcon from '@images/diamond-circle.svg?react';
import type {ReactElement} from 'react';
import {OperationColor} from '@/models';
import type {Nullable} from '@/models';

const OperationCardDesktop = ({name, symbol, date, time, logo, value, price, type, total, isTotalPlus, className}: OperationCardDesktopProps) => {
    const classes = cn(
        styles.card,
        className,
        isTotalPlus ? styles.plus : styles.minus,
    );

    let icon: Nullable<ReactElement<SVGElement>> = null;
    let badgeColor: OperationColor = OperationColor.Gray;

    switch (type) {
        case 'deposit':
        case 'withdraw':
            icon = <DollarIcon />;
            break;
        case 'sale':
            badgeColor = OperationColor.Red;
            icon = <DollarIcon />;
            break;
        default:
            badgeColor = OperationColor.Green;
            icon = <DiamondIcon />;
    }

    return (
        <div className={classes}>
            <TickerCardInfo
                className={styles.header}
                symbol={symbol}
                logo={logo}
                name={name}
            />
            <span className={styles.date}>{date}</span>
            <span className={styles.time}>{time}</span>
            <div className={styles.type}>
                <Badge
                    text={type}
                    icon={icon}
                    color={badgeColor}
                />
            </div>
            <span className={styles.price}>{price}</span>
            <span className={styles.value}>{value}</span>
            <span className={styles.total}>{total}</span>
        </div>
    );
};

export default OperationCardDesktop;