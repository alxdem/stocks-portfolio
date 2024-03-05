import { ITickerList } from '@organisms/TickerList/TickerList.props';
import styles from '@organisms/TickerList/TickerList.module.css';
import { TickerCard } from '@molecules/TickerCard/TickerCard';

const TickerList = ({ items }: ITickerList) => {
    const elements = items.map(item => {
        return (
            <TickerCard
                key={item.symbol}
                symbol={item.symbol}
                name={item.name}
                value={item.value}
                gainPercent={item.gainPercent}
                totalPrice={item.totalPrice}
            />
        );
    })

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <div className={styles.hName}>Company</div>
                <div className={styles.hLots}>Lots</div>
                <div className={styles.hAmount}>Total</div>
            </div>
            <div className={styles.inner}>
                {elements}
            </div>
        </div>
    );
};

export default TickerList;