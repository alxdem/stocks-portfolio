import { ITickerList } from './TickerList.props';
import styles from './TickerList.module.css';
import { formatPrice } from '../../utils/utils';
import { TickerCard } from '../TickerCard/TickerCard';

const TickerList = ({ items, tickerData, amount }: ITickerList) => {
    const localItems = amount ? items.slice(0, amount) : items;
    const elements = localItems.map(item => {
        const currentTicker = tickerData.filter(ticker => ticker.symbol === item.code)[0] || {};
        const name = currentTicker.name || '';
        const price = currentTicker.price > 0 ? currentTicker.price * item.value : '-';
        const logoSrc = `https://static.fincake.io/logos/stock/nyse/usd/${item.code}.png`;

        return (
            <TickerCard
                key={item.code}
                code={item.code}
                name={name}
                value={item.value}
                price={formatPrice(price)}
                logo={logoSrc}
            />
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