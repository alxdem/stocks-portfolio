import styles from './TickerCardInfo.module.css';
import { ITickerCardInfo } from './TickerCardInfo.props';
import TickerLogo from '../TickerLogo/TickerLogo';
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