import type { TickerCardInfoProps } from '@molecules/TickerCardInfo/TickerCardInfo.props';
import styles from '@molecules/TickerCardInfo/TickerCardInfo.module.css';
import cn from 'classnames';
import Logo from '@atoms/Logo/Logo';

const TickerCardInfo = ({symbol, name = '', className}: TickerCardInfoProps) => {
    const classes = cn(
        styles.main,
        className,
        symbol && styles.grid,
    );

    return(
        <div className={classes}>
            <Logo
                symbol={symbol}
                alt={name}
                className={styles.logo}
            />
            {symbol && <span className={styles.symbol}>{symbol}</span>}
            <span className={styles.name}>{name}</span>
        </div>
    );
};

export default TickerCardInfo;