import type {TickerCardProps} from '@organisms/TickerCard/TickerCard.props';
import styles from '@organisms/TickerCard/TickerCardDesktop/TickerCardDesktop.module.css';
import {Link} from 'react-router';
import TickerCardInfo from '@molecules/TickerCardInfo/TickerCardInfo';
import cn from 'classnames';
import {getTickerUrl} from '@/utils';

const TickerCardDesktop = ({
         symbol,
         name,
         value,
         price,
         averagePrice,
         totalPrice,
         gain,
         gainPercent,
         isLoss
     }: TickerCardProps) => {
    const classes = cn(
        styles.card,
        isLoss ? styles.loss : styles.profit,
    );

    return (
        <Link to={getTickerUrl(symbol)} className={classes}>
            <TickerCardInfo
                className={styles.header}
                symbol={symbol}
                logo=''
                name={name}
            />
            <span className={styles.value}>{value}</span>
            <span className={styles.price}>{price}</span>
            <span className={styles.averagePrice}>{averagePrice}</span>
            <span className={styles.gain}>{gain}</span>
            <span className={styles.gainPercent}>{gainPercent}</span>
            <span className={styles.totalPrice}>{totalPrice}</span>
        </Link>
    );
};

export default TickerCardDesktop;
