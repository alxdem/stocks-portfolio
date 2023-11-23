import styles from './TickerCardInfo.module.css';
import { ITickerCardInfo } from './TickerCardInfo.props';
import TickerLogo from '../TickerLogo/TickerLogo';

export const TickerCardInfo = ({ logo, code, name }: ITickerCardInfo) => {
    return (
        <div className={styles.info}>
            <div className={styles.logo}>
                <TickerLogo
                    imageSrc={logo}
                    alt={name}
                    isRounded
                />
            </div>
            <div className={styles.company}>
                <span className={styles.code}>{code}</span>
                <span className={styles.name}>{name}</span>
            </div>
        </div>
    );
}