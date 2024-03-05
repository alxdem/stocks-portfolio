import { TickerCardInfo } from '@molecules/TickerCardInfo/TickerCardInfo';
import styles from '@molecules/TickerExtendedCard/TickerExtendedCard.module.css';
import { ITickerExtendedCard } from '@molecules/TickerExtendedCard/TickerExtendedCard.props';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { formatPrice, gainClass } from '@utils/utils';
import useGetLogo from '@src/hooks/useGetLogo';

// TODO: Придумать как сохранять загруженные картинки
export const TickerExtendedCard = ({
    symbol,
    name,
    value,
    totalPrice,
    averagePrice,
    price,
    gain,
    gainPercent
}: ITickerExtendedCard) => {
    const logoSrc = useGetLogo(symbol);
    const totalPriceFormated = totalPrice && totalPrice > 0 ? totalPrice : '-';
    const gainClasses = cn(
        styles.gain,
        gainClass(gain, styles.plus, styles.minus)
    );

    return (
        <Link to={`/stock/${symbol}`} className={styles.card}>
            <div className={styles.info}>
                <TickerCardInfo
                    symbol={symbol}
                    name={name}
                    logo={logoSrc}
                />
            </div>
            <div className={styles.shares}>{value}</div>
            <div className={styles.currentPrice}>{formatPrice(price)}</div>
            <div className={styles.averagePrice}>{formatPrice(averagePrice)}</div>
            <div className={gainClasses}>{formatPrice(gain)}</div>
            <div className={gainClasses}>{formatPrice(gainPercent, true)}</div>
            <div className={styles.total}>{formatPrice(totalPriceFormated)}</div>
        </Link>
    );
}