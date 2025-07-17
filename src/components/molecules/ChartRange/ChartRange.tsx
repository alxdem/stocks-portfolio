import type {ChartRangeProps} from '@molecules/ChartRange/ChartRange.props';
import styles from '@molecules/ChartRange/ChartRange.module.css';
import cn from 'classnames';
import {getNormalizedValue} from '@utils';

const ChartRange = ({value, min = 0, max = 100, className}: ChartRangeProps) => {
    const range = max - min;

    if (value === null || range <= 0) {
        return null;
    }

    const normalizedValue = getNormalizedValue(value, min, max);
    const relative = (normalizedValue - min) / range;
    const offsetPercent = Math.round(relative * 100);

    const minText = min === 0 ? 0 : min?.toFixed(2);
    const maxText = max === 0 ? 0 : max?.toFixed(2);
    const localValue = value === 0 ? 0 : value.toFixed(2);

    return (
        <div className={cn(styles.container, className)}>
            <div className={styles.chart}>
                <span
                    className={styles.current}
                    style={{left: `${offsetPercent}%`}}
                ></span>
            </div>
            <span
                className={cn(styles.value, styles.currentValue)}
                style={{left: `${offsetPercent}%`}}
            >
                {localValue}
            </span>
            <span className={cn(styles.value, styles.min)}>{minText}</span>
            <span className={cn(styles.value, styles.max)}>{maxText}</span>
        </div>
    );
};

export default ChartRange;
