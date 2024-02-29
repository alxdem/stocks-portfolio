import { ITickerExtendedList } from './TickerExtendedList.props';
import styles from './TickerExtendedList.module.css';
import { TickerExtendedCard } from '../../molecules/TickerExtendedCard/TickerExtendedCard';
import { TickerExtendedCardMob } from '../../molecules/TickerExtendedCardMob/TickerExtendedCardMob';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { QUERY_MOBILE, RESOLUTION_MOB } from '../../../utils/variables';

const TickerExtendedList = ({ items, stocksData }: ITickerExtendedList) => {
    const isMobile = useMediaQuery(QUERY_MOBILE);

    const elements = items.map(item => {
        const currentShare = stocksData[item.symbol] || {};
        const name = currentShare.name;
        const {
            symbol,
            value,
            price,
            totalPrice,
            averagePrice,
            gain,
            gainPercent,
        } = item;

        if (isMobile) {
            return (
                <TickerExtendedCardMob
                    key={symbol + 'mob'}
                    symbol={symbol}
                    value={value}
                    price={price}
                    name={name}
                    totalPrice={totalPrice}
                    averagePrice={averagePrice}
                    gain={gain}
                    gainPercent={gainPercent}
                />
            );
        }

        return (
            <TickerExtendedCard
                key={symbol}
                symbol={symbol}
                name={name}
                value={value}
                price={price}
                totalPrice={totalPrice}
                averagePrice={averagePrice}
                gain={gain}
                gainPercent={gainPercent}
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