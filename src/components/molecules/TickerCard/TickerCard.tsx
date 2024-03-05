import { ITickerCard } from '@molecules/TickerCard/TickerCard.props';
import styles from '@molecules/TickerCard/TickerCard.module.css';
import { TickerCardInfo } from '@molecules/TickerCardInfo/TickerCardInfo';
import { formatPrice, gainClass } from '@src/utils/utils';
import useGetLogo from '@src/hooks/useGetLogo';
import cn from 'classnames';

export const TickerCard = ({ symbol, value, name, totalPrice, gainPercent }: ITickerCard) => {
    const logoSrc = useGetLogo(symbol);
    const totalPriceFormated = totalPrice && totalPrice > 0 ? totalPrice : '-';
    const gainClasses = cn(
        styles.gain,
        gainClass(gainPercent, styles.plus, styles.minus)
    );

    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <TickerCardInfo
                    symbol={symbol}
                    name={name}
                    logo={logoSrc}
                />
            </div>
            <div className={styles.value}>{value}</div>
            <div className={styles.amount}>
                <span className={styles.amountPrice}>${formatPrice(totalPriceFormated)}</span>
                <span className={gainClasses}>{formatPrice(gainPercent)}%</span>
            </div>
        </div>
    );
};