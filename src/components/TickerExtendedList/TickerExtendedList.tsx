import { ITickerExtendedList } from './TickerExtendedList.props';
import styles from './TickerExtendedList.module.css';
import { gainCount, gainPercentCount } from '../../utils/utils';
import { TickerExtendedCard } from '../TickerExtendedCard/TickerExtendedCard';

const TickerExtendedList = ({ items, tickerData }: ITickerExtendedList) => {
    const elements = items.map(item => {
        const currentTicker = tickerData.filter(ticker => ticker.symbol === item.code)[0] || {};
        const name = currentTicker.name || '';
        const price = currentTicker.price;
        const gain = gainCount(item.averagePrice, price, item.value);
        const gainP = gainPercentCount(item.averagePrice, price);

        return (
            <TickerExtendedCard
                key={item.code}
                code={item.code}
                name={name}
                value={item.value}
                totalPrice={price}
                averagePrice={item.averagePrice}
                currnetPrice={price}
                gain={gain}
                gainPercent={gainP}
            />
        );
    })

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <div className={styles.hName}>Company</div>
                <div className={styles.hShares}>Shares</div>
                <div className={styles.hCurrent}>Price</div>
                <div className={styles.hAverage}>Avg. cost</div>
                <div className={styles.hGane}>Gain $</div>
                <div className={styles.hGaneP}>Gain %</div>
                <div className={styles.hTotal}>Total cost</div>
            </div>
            <div className={styles.inner}>
                {elements}
            </div>
        </div>
    );
};

export default TickerExtendedList;