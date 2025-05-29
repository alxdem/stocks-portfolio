import styles from '@organisms/TickerCard/TickerCardMobile/TickerCardMobile.module.css';
import {Link} from 'react-router';
import cn from 'classnames';
import type {TickerCardProps} from '@organisms/TickerCard/TickerCard.props';
import Logo from '@atoms/Logo/Logo';

const TickerCardMobile = ({
    symbol,
    name,
    value,
    price,
    totalPrice,
    gain,
    gainPercent,
    isLoss
}: TickerCardProps) => {
    const classes = cn(
        styles.card,
        isLoss ? styles.loss : styles.profit,
    );

    return (
        <Link to={`/${symbol}`} className={classes}>
          <Logo
              src=''
              alt={name}
              className={styles.logo}
          />
          <div className={styles.header}>
            <span className={styles.name}>{name}</span>
            <span className={styles.totalPrice}>{totalPrice}</span>
          </div>
          <div className={styles.footer}>
            <span className={styles.value}>sh: {value}</span>
            <span className={styles.price}>{price}</span>
            <span className={styles.gain}>{gain}</span>
            <span className={styles.gainPercent}>{gainPercent}</span>
          </div>
        </Link>
    );
};

export default TickerCardMobile;
