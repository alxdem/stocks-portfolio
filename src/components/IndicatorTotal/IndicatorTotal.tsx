import { formatPrice } from '../../utils/utils';
import styles from './IndicatorTotal.module.css';
import { IIndicatorTotal } from './IndicatorTotal.props';

const IndicatorTotal = ({ value, percent, title, type }: IIndicatorTotal) => {
    const formatValue = type === 'percent' ? `${value}%` : formatPrice(value);
    const percentClass = percent && percent < 0 ? styles.percentDecreased : null;

    return (
        <div className={styles.indicator}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.value}>{formatValue}</div>
            {percent && <div className={`${styles.percent} ${percentClass}`}>{percent}%</div>}
        </div>
    );
};

export default IndicatorTotal;