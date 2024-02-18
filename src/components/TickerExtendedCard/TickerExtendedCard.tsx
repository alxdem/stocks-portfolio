import { TickerCardInfo } from '../TickerCardInfo/TickerCardInfo';
import styles from './TickerExtendedCard.module.css';
import { ITickerExtendedCard } from './TickerExtendedCard.props';
import { formatPrice } from '../../utils/utils';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { LOGO_API_URL } from '../../utils/variables';
import useFetch from '../../hooks/useFetch';

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
    // const [logoInfo] = useFetch(`${LOGO_API_URL + symbol}`, [{ image: '' }], {
    //     headers: {
    //         'X-Api-Key': import.meta.env.VITE_NINJAS_KEY
    //     }
    // });
    // const logoSrc = logoInfo[0] && logoInfo[0].image ? logoInfo[0].image : '';
    const logoSrc = '';
    const totalPriceFormated = totalPrice && totalPrice > 0 ? totalPrice : '-';
    const gainClass = cn(
        gain && gain > 0 ? styles.plus : null,
        gain && gain < 0 ? styles.minus : null
    );
    const gainClasses = cn(
        styles.gain,
        gainClass
    );

    const gainPClasses = cn(
        styles.gainP,
        gainClass
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
            <div className={gainPClasses}>{formatPrice(gainPercent, true)}</div>
            <div className={styles.total}>{formatPrice(totalPriceFormated)}</div>
        </Link>
    );
}