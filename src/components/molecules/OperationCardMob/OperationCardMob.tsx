import { formatPrice } from '@utils/utils';
import { IOperationCard } from '@molecules/OperationCard/OperationCard.props';
import styles from '@molecules/OperationCardMob/OperationCardMob.module.css';
import cn from 'classnames';
import { OperationType } from '@models/common';
import TickerLogo from '@atoms/TickerLogo/TickerLogo';


const OperationCardMob = ({ name, logo, date, time, price, type, value, className }: IOperationCard) => {
    const total = formatPrice(price * value);
    const typeClass = type === OperationType.Sale ? styles.plus : styles.minus;
    const sign = type === OperationType.Sale ? '+' : '-';

    return (
        <div className={cn(styles.card, className, typeClass)}>
            <TickerLogo
                className={styles.logo}
                imageSrc={logo}
                alt={name}
                isRounded
            />

            <div className={styles.info}>
                <div className={styles.row}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.total}>{sign}${total}</span>
                </div>

                <div className={styles.row}>
                    <div className={styles.couple}>
                        <span className={styles.text}>{date}</span>
                        <span className={styles.text}>{time}</span>
                    </div>
                    <div className={styles.couple}>
                        <span className={styles.text}>${formatPrice(price)}</span>
                        <span className={styles.text}>{value}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperationCardMob;