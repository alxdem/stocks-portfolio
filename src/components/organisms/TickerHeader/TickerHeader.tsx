import type {TickerHeaderProps} from '@organisms/TickerHeader/TickerHeader.props.ts';
import styles from '@organisms/TickerHeader/TickerHeader.module.css';
import Logo from '@atoms/Logo/Logo.tsx';
import CloudSection from '@molecules/CloudSection/CloudSection.tsx';
import {formatNumber, getChange} from '@utils';
import cn from 'classnames';
import BadgeGain from '@molecules/BadgeGain/BadgeGain';

const TickerHeader = ({symbol = '', title, price, change, changePercentage}: TickerHeaderProps) => {
    const isFall = change && change < 0;
    const isRise = change && change > 0;
    const localChangePercentage = changePercentage ? formatNumber(changePercentage) : '';

    const {changeValue, sign} = getChange(change || 0);

    const classes = cn(
        styles.header,
        isFall && styles.fall,
        isRise && styles.rise,
    );

    return (
        <CloudSection className={classes}>
            <h1 className={styles.title}>{title}</h1>
            <Logo
                symbol={symbol}
                alt={title || ''}
                className={styles.logo}
            />
            <div className={styles.info}>
                <span className={styles.price}>{price}</span>
                <BadgeGain
                    value={changePercentage || 0}
                    text={`${localChangePercentage}%`}
                    size='lg'
                />
                {changeValue && <span className={styles.change}>
                    {sign}{changeValue}
                    <span className={styles.today}>&nbsp;Today</span>
                </span>}
            </div>
        </CloudSection>
    );
};

export default TickerHeader;
