import { ITickerExtendedList } from './TickerExtendedList.props';
import styles from './TickerExtendedList.module.css';
import { gainCount, gainPercentCount } from '../../utils/utils';
import { TickerExtendedCard } from '../TickerExtendedCard/TickerExtendedCard';
import { TickerExtendedCardMob } from '../TickerExtendedCardMob/TickerExtendedCardMob';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { QUERY_MOBILE, RESOLUTION_MOB } from '../../utils/variables';

const TickerExtendedList = ({ items, tickerData }: ITickerExtendedList) => {
    const isMobile = useMediaQuery(QUERY_MOBILE);

    const elements = items.map(item => {
        const currentTicker = tickerData.filter(ticker => ticker.symbol === item.code)[0] || {};
        const name = currentTicker.name || '';
        const price = currentTicker.price;
        const gain = gainCount(item.averagePrice, price, item.value);
        const gainP = gainPercentCount(item.averagePrice, price);

        if (isMobile) {
            return (
                <TickerExtendedCardMob
                    code={item.code + 'mob'}
                    key={item.code}
                    value={item.value}
                    name={name}
                    totalPrice={price}
                    averagePrice={item.averagePrice}
                    gain={gain}
                    gainPercent={gainP}
                />
            );
        }

        return (
            <TickerExtendedCard
                code={item.code}
                key={item.code}
                name={name}
                value={item.value}
                totalPrice={price}
                averagePrice={item.averagePrice}
                currnetPrice={price}
                gain={gain}
                gainPercent={gainP}
            />
        )
    })

    return (
        <div className={styles.list}>
            <MediaQuery minWidth={RESOLUTION_MOB}>
                <div className={styles.header}>
                    <div className={styles.hName}>Company</div>
                    <div className={styles.hShares}>Shares</div>
                    <div className={styles.hCurrent}>Price</div>
                    <div className={styles.hAverage}>Avg. cost</div>
                    <div className={styles.hGane}>Gain $</div>
                    <div className={styles.hGaneP}>Gain %</div>
                    <div className={styles.hTotal}>Total cost</div>
                </div>
            </MediaQuery>
            <div className={styles.inner}>
                {elements}
            </div>
        </div>
    );
};

export default TickerExtendedList;