import TickerLogo from '@atoms/TickerLogo/TickerLogo';
import styles from '@molecules/TickerCardInfo/TickerCardInfo.module.css';
import { ITickerCardInfo } from '@molecules/TickerCardInfo/TickerCardInfo.props';
import cn from 'classnames';

export const TickerCardInfo = ({ logo, symbol, name, className }: ITickerCardInfo) => {
    return (
        <div className={cn(styles.info, className)}>
            <TickerLogo
                className={styles.logo}
                imageSrc={logo}
                alt={name}
                isRounded
            />
            <div className={styles.company}>
                <span className={styles.symbol}>{symbol}</span>
                <span className={styles.name}>{name}</span>
            </div>
        </div>
    );
}