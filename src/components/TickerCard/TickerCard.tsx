import { ITickerCard } from './TickerCard.props';
import styles from './TickerCard.module.css';

export const TickerCard = ({ code, value, name }: ITickerCard) => {
    const logoSrc = `https://static.fincake.io/logos/stock/nyse/usd/${code}.png`;

    return (
        <div className={styles.card}>
            <div className={styles.logo}>
                <img src={logoSrc} alt="" />
            </div>
            <div className={styles.info}>
                <span className={styles.code}>{code}</span>
                <span className={styles.name}>{name}</span>
            </div>
            <div className={styles.count}>{value}</div>
        </div>
    );
};