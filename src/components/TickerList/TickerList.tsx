import { ITickerList } from './TickerList.props';
import styles from './TickerList.module.css';
import { formatPrice } from '../../utils/utils';

const TickerList = ({ items, tickerData }: ITickerList) => {
    const elements = items.map(item => {
        const currentTicker = tickerData.filter(ticker => ticker.symbol === item.code)[0] || {};
        const name = currentTicker.name || '';
        const price = currentTicker.price > 0 ? currentTicker.price * item.value : '-';
        const logoSrc = `https://static.fincake.io/logos/stock/nyse/usd/${item.code}.png`;

        return (
            <div className={styles.card} key={item.code}>
                <div className={styles.info}>
                    <div className={styles.logo}>
                        <img src={logoSrc} alt="" />
                    </div>
                    <div className={styles.company}>
                        <span className={styles.code}>{item.code}</span>
                        <span className={styles.name}>{name}</span>
                    </div>
                </div>
                <div className={styles.value}>{item.value}</div>
                <div className={styles.amount}>
                    <span className={styles.amountPrice}>{formatPrice(price)}</span>
                    <span className={styles.profit}>+ 13,2</span>
                </div>
            </div>
        );
    })

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <div className={styles.hName}>Company</div>
                <div className={styles.hLots}>Lots</div>
                <div className={styles.hAmount}>Amount</div>
            </div>
            <div className={styles.inner}>
                {elements}
            </div>
        </div>
    );
};

export default TickerList;