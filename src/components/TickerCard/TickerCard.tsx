import { ITickerCard } from './TickerCard.props';
import styles from './TickerCard.module.css';

export const TickerCard = ({ code, value, name, logo, price }: ITickerCard) => {
    // TODO: Make logo empty fill
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <div className={styles.logo}>
                    <img src={logo} alt="" />
                </div>
                <div className={styles.company}>
                    <span className={styles.code}>{code}</span>
                    <span className={styles.name}>{name}</span>
                </div>
            </div>
            <div className={styles.value}>{value}</div>
            <div className={styles.amount}>
                <span className={styles.amountPrice}>{price}</span>
                <span className={styles.profit}>+ 13,2</span>
            </div>
        </div>
    );
};