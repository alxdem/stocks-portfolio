import { formatPrice } from '@utils/utils';
import styles from '@atoms/IndicatorTotal/IndicatorTotal.module.css';
import { IIndicatorTotal } from '@atoms/IndicatorTotal/IndicatorTotal.props';
import cn from 'classnames';

const IndicatorTotal = ({ value, percent, title, type }: IIndicatorTotal) => {
    const removedFirstSymbol = formatPrice(value).slice(1);
    const formattedPrice = value < 0 ? `-$${removedFirstSymbol}` : `${formatPrice(value)}`;
    const formatValue = type === 'percent' ? `${value}%` : formattedPrice;
    const percentClass = percent && percent < 0 ? styles.decreased : null;
    const valueClass = value < 0 ? styles.decreased : null;

    return (
        <div className={styles.indicator}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={cn(styles.value, valueClass)}>{formatValue}</div>
            {percent && <div className={cn(styles.percent, percentClass)}>{percent}%</div>}
        </div>
    );
};

export default IndicatorTotal;