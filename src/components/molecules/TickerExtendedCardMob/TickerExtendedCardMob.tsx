import styles from '@molecules/TickerExtendedCardMob/TickerExtendedCardMob.module.css';
import { ITickerExtendedCard } from '@molecules/TickerExtendedCard/TickerExtendedCard.props';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import TickerLogo from '@atoms/TickerLogo/TickerLogo';
import { formatPrice } from '@utils/utils';
// import { LOGO_API_URL } from '../../utils/variables';
// import useFetch from '../../hooks/useFetch';

// TODO: Придумать как сохранять загруженные картинки
export const TickerExtendedCardMob = ({
    symbol,
    name,
    value,
    totalPrice,
    averagePrice,
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
    const totalPriceFormated = totalPrice && totalPrice > 0 ? totalPrice * value : '-';
    const gainClass = cn(
        gain && gain > 0 ? styles.plus : null,
        gain && gain < 0 ? styles.minus : null
    );
    const gainClasses = cn(
        styles.text,
        gainClass
    );

    const gainPClasses = cn(
        styles.text,
        gainClass
    );

    return (
        <Link to={`/stock/${symbol}`} className={styles.card}>
            <TickerLogo
                className={styles.logo}
                imageSrc={logoSrc}
                alt={name}
                isRounded
            />

            <div className={styles.info}>
                <div className={styles.row}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.total}>${formatPrice(totalPriceFormated)}</span>
                </div>
                <div className={styles.row}>
                    <div className={styles.couple}>
                        <span className={styles.text}>sh: {value}</span>
                        <span className={styles.text}>${formatPrice(averagePrice)}</span>
                    </div>
                    <div className={styles.couple}>
                        <span className={gainClasses}>${formatPrice(gain)}</span>
                        <span className={gainPClasses}>{formatPrice(gainPercent, true)}%</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}