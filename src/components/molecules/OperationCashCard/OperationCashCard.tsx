import { IOperationCash } from '@molecules/OperationCashCard/OperationCashCard.props';
import styles from '@molecules/OperationCashCard/OperationCashCard.module.css';
import cn from 'classnames';
import { ReactComponent as DollarIcon } from '@svg/dollar-circle.svg';
import TickerLogo from '@atoms/TickerLogo/TickerLogo';
import Badge from '@atoms/Badge/Badge';
import { OperationColor } from '@models/common';
import { formatPrice } from '@utils/utils';

const OperationCashCard = ({ date, time, type, value, className }: IOperationCash) => {
    const icon = <DollarIcon className={styles.icon} />;

    return (
        <div className={cn(styles.card, className)}>
            <div className={styles.info}>
                <TickerLogo
                    className={styles.logo}
                    isRounded
                />
                <span className={styles.name}>Refill</span>
            </div>
            <span className={styles.dateTime}>
                <span className={styles.nameMob}>Refill</span>
                <span className={styles.date}>{date}</span>
                <span className={styles.time}>{time}</span>
            </span>
            <div className={styles.type}>
                <Badge
                    className={styles.badge}
                    text={type}
                    icon={icon}
                    color={OperationColor.Green}
                />
            </div>
            <span className={styles.price}></span>
            <span className={styles.value}></span>
            <span className={styles.total}>+${formatPrice(value)}</span>
        </div>
    );
}

export default OperationCashCard;