import { TickerCardInfo } from '../TickerCardInfo/TickerCardInfo';
import Badge from '../../atoms/Badge/Badge';
import { OperationColor, OperationType } from '../../../models/common';
import { IOperationCard } from './OperationCard.props';
import styles from './OperationCard.module.css';
import cn from 'classnames';
import { formatPrice } from '../../../utils/utils';
import { ReactComponent as DollarIcon } from './../../../assets/svg/dollar-circle.svg';
import { ReactComponent as DiamondIcon } from './../../../assets/svg/diamond-circle.svg';

const OperationCard = ({ name, symbol, logo, date, time, price, type, value, className }: IOperationCard) => {
    const total = formatPrice(price * value);
    const typeClass = type === OperationType.Sale ? styles.plus : styles.minus;
    const sign = type === OperationType.Sale ? '+' : '-';
    const icon = type === OperationType.Sale ? <DollarIcon /> : <DiamondIcon />;
    const badgeColor = type === OperationType.Sale ? OperationColor.Red : OperationColor.Green;

    return (
        <div className={cn(styles.card, className, typeClass)}>
            <TickerCardInfo
                className={styles.info}
                symbol={symbol}
                name={name}
                logo={logo}
            />
            <span className={styles.dateTime}>
                <span className={styles.date}>{date}</span>
                <span className={styles.time}>{time}</span>
            </span>
            <div className={styles.type}>
                <Badge
                    className={styles.badge}
                    text={type}
                    icon={icon}
                    color={badgeColor}
                />
            </div>
            <span className={styles.price}>${formatPrice(price)}</span>
            <span className={styles.value}>{value}</span>
            <span className={styles.total}>{sign}${total}</span>
        </div>
    );
}

export default OperationCard;