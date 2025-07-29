import type {StockCardProps} from '@molecules/StockCard/StockCard.props';
import styles from '@molecules/StockCard/StockCard.module.css';
import TickerCardInfo from '@molecules/TickerCardInfo/TickerCardInfo';
import cn from 'classnames';
import {Link} from 'react-router';
import {getTickerUrl} from '@utils';

const StockCard = ({ref, symbol, name, price, sector, className}: StockCardProps) => {
    return (
        <Link
            ref={ref}
            to={getTickerUrl(symbol)}
            className={cn(styles.card, className)}
        >
            <TickerCardInfo
                className={styles.header}
                symbol={symbol}
                name={name}
            />
            <span className={styles.sector}>{sector}</span>
            <span className={styles.price}>{price}</span>
        </Link>
    );
};

export default StockCard;
