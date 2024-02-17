import { ITickerCard } from './TickerCard.props';
import styles from './TickerCard.module.css';
import { TickerCardInfo } from '../TickerCardInfo/TickerCardInfo';

export const TickerCard = ({ symbol, value, name, logo, price }: ITickerCard) => {
    // TODO: Make logo empty fill
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <TickerCardInfo
                    symbol={symbol}
                    name={name}
                    logo={logo}
                />
            </div>
            <div className={styles.value}>{value}</div>
            <div className={styles.amount}>
                <span className={styles.amountPrice}>{price}</span>
                <span className={styles.profit}>+ 13,2</span>
            </div>
        </div>
    );
};