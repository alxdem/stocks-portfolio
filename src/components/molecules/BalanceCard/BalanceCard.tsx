import type {BalanceCardProps} from '@molecules/BalanceCard/BalanceCard.props';
import styles from '@molecules/BalanceCard/BalanceCard.module.css';
import cn from 'classnames';
import CloudSection from '@molecules/CloudSection/CloudSection';
import {formatNumber, getDifferencePercent} from '@/utils';
import ArrowIcon from '@images/arrow-circle.svg?react';

const BalanceCard = ({className, title, value, deposit}: BalanceCardProps) => {
    const formattedValue = formatNumber(value, false, true);
    const formattedDeposit = formatNumber(deposit, false, true);
    const difference = value - deposit;
    const formatedDifference = `${formatNumber(difference, true, true)}`;
    const formattedPercent = `${getDifferencePercent(deposit, value).toFixed(2)}%`;

    const classes = cn(
        styles.card,
        className,
        difference && styles.loss,
    );

    return (
        <CloudSection className={classes}>
            {title && <span className={styles.title}>{title}</span>}
            <div className={cn(styles.line, styles.primaryText)}>
                <span className={styles.value}>{formattedValue}</span>
                <div className={styles.differencePercent}>
                    <ArrowIcon className={styles.icon} />
                    <span>{formattedPercent}</span>
                </div>
            </div>
            <div className={cn(styles.line, styles.secondaryText)}>
                <p className={styles.deposit}>{formattedDeposit} <span>deposit</span></p>
                <p className={styles.difference}>{formatedDifference}</p>
            </div>
        </CloudSection>
    );
};

export default BalanceCard;
