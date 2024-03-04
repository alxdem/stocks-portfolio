import { ITickerHeader } from '@organisms/TickerHeader/TickerHeader.props';
import styles from '@organisms/TickerHeader/TickerHeader.module.css';
import TickerLogo from '@atoms/TickerLogo/TickerLogo';
import { formatPrice } from '@utils/utils';
import cn from 'classnames';

const TickerHeader = ({ title, logo, price, industry, symbol, className }: ITickerHeader) => {
    return (
        <section className={cn(styles.header, className)}>
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