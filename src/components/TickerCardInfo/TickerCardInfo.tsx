import styles from './TickerCardInfo.module.css';
import { ITickerCardInfo } from './TickerCardInfo.props';
import TickerLogo from '../TickerLogo/TickerLogo';

export const TickerCardInfo = ({ logo, code, name }: ITickerCardInfo) => {
    return (
        <div className={styles.info}>
            <TickerLogo
                className={styles.logo}
                imageSrc={logo}
                alt={name}
                isRounded
            />
            <div className={styles.company}>
                <span className={styles.code}>{code}</span>
                <span className={styles.name}>{name}</span>
            </div>
        </div>
    );
}