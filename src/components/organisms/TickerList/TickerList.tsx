import { ITickerList } from '@organisms/TickerList/TickerList.props';
import styles from '@organisms/TickerList/TickerList.module.css';
import { TickerCard } from '@molecules/TickerCard/TickerCard';
import { formatPrice } from '@utils/utils';

const TickerList = ({ items, stocksData, amount }: ITickerList) => {
    const localItems = amount ? items.slice(0, amount) : items;
    const elements = localItems.map(item => {
        const currentTicker = stocksData[item.symbol] || {};
        const name = currentTicker.name || '';
        const price = currentTicker.price > 0 ? currentTicker.price * item.value : '-';
        const logoSrc = `https://static.fincake.io/logos/stock/nyse/usd/${item.symbol}.png`;

        return (
            <TickerCard
                key={item.symbol}
                symbol={item.symbol}
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