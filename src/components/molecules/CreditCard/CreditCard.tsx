import type {CreditCardProps} from '@molecules/CreditCard/CreditCard.props';
import styles from '@molecules/CreditCard/CreditCard.module.css';
import cn from 'classnames';
import CardImage from '@images/card.webp';
import { getBankData } from 'bin-list-fake';
import {memo} from 'react';

const CreditCard = memo(({number = '', expDate = '', cvv = '', className}: CreditCardProps) => {
    const DEFAULT_CARD_GRADIENT = 'linear-gradient(90deg, #0F0F13, #2196f3)';
    const bankMask = number ? Number(number?.slice(0, 2)) : -1;
    const info = getBankData(bankMask);
    const {logo, colors = []} = info || {};

    const defaultBg = number?.length > 1 ? DEFAULT_CARD_GRADIENT : 'none';
    const backgroundImage = info ? `linear-gradient(90deg, ${colors[0]}, ${colors[1]})` : defaultBg;

    return (
        <div
            className={cn(styles.card, className)}
            style={{
                backgroundImage: backgroundImage,
            }}
        >
            <img className={styles.cardImage} src={CardImage} alt=''/>
            {logo && <img className={styles.logo} src={logo} alt=''/>}
            <span className={styles.number}>{number}</span>
            <span className={styles.expDate}>{expDate}</span>
            <span className={styles.cvv}>{cvv}</span>
        </div>
    );
});

export default CreditCard;
