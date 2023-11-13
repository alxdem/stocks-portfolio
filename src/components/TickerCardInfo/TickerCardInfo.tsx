import styles from './TickerCardInfo.module.css';
import { ITickerCardInfo } from './TickerCardInfo.props';

export const TickerCardInfo = ({ logo, code, name }: ITickerCardInfo) => {
    const Cap = () => <div className={styles.cap}></div>;
    const logoImage = logo ? <img src={logo} alt="name" /> : <Cap />;

    return (
        <div className={styles.info}>
            <div className={styles.logo}>
                {logoImage}
            </div>
            <div className={styles.company}>
                <span className={styles.code}>{code}</span>
                <span className={styles.name}>{name}</span>
            </div>
        </div>
    );
}