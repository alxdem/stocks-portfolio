import { TickerCardInfo } from '../TickerCardInfo/TickerCardInfo';
import styles from './TickerExtendedCard.module.css';
import { ITickerExtendedCard } from './TickerExtendedCard.props';
import { formatPrice } from '../../utils/utils';
import cn from 'classnames';
import { Link } from 'react-router-dom';

// TODO: Придумать как сохранять загруженные картинки
export const TickerExtendedCard = ({
    code,
    name,
    value,
    totalPrice,
    averagePrice,
    currnetPrice,
    gain,
    gainPercent
}: ITickerExtendedCard) => {
    // const [logoInfo] = useFetch(`${LOGO_API_URL + code}`, [{ image: '' }], {
    //     headers: {
    //         'X-Api-Key': import.meta.env.VITE_NINJAS_KEY
    //     }
    // });
    // const logoSrc = logoInfo[0] && logoInfo[0].image ? logoInfo[0].image : '';
    const logoSrc = '';
    const totalPriceFormated = totalPrice && totalPrice > 0 ? totalPrice * value : '-';
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
        <Link to={`/stock/${code}`} className={styles.card}>
            <div className={styles.info}>
                <TickerCardInfo
                    code={code}
                    name={name}
                    logo={logoSrc}
                />
            </div>
            <div className={styles.shares}>{value}</div>
            <div className={styles.currentPrice}>{formatPrice(currnetPrice)}</div>
            <div className={styles.averagePrice}>{formatPrice(averagePrice)}</div>
            <div className={gainClasses}>{formatPrice(gain)}</div>
            <div className={gainPClasses}>{formatPrice(gainPercent, true)}</div>
            <div className={styles.total}>{formatPrice(totalPriceFormated)}</div>
        </Link>
    );
}