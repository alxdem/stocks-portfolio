import { ITickerHeader } from './TickerHeader.props';
import styles from './TickerHeader.module.css';
import TickerLogo from '../TickerLogo/TickerLogo';
import { formatPrice } from '../../utils/utils';

const TickerHeader = ({ title, logo, price, industry, symbol }: ITickerHeader) => {
    return (
        <section className={styles.header}>
            <div className={styles.top}>
                <h1>{title} ({symbol})</h1>
                <TickerLogo
                    className={styles.logo}
                    imageSrc={logo}
                    alt={title}
                    isRounded
                />
            </div>
            <div className={styles.bottom}>
                <span className={styles.price}>${formatPrice(price)}</span>
                <span className={styles.industry}>{industry}</span>
            </div>
        </section>
    );
}

export default TickerHeader;