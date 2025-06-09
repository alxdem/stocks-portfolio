import type {BalanceProps} from '@molecules/Balance/Balance.props';
import styles from '@molecules/Balance/Balance.module.css';
import cn from 'classnames';
import CloudSection from '@molecules/CloudSection/CloudSection';

const Balance = ({className, title, value}: BalanceProps) => {
    return (
        <CloudSection className={cn(styles.balance, className)}>
            {title && <span className={styles.title}>{title}</span>}
            {value && <span className={styles.value}>{value}</span>}
        </CloudSection>
    );
};

export default Balance;
