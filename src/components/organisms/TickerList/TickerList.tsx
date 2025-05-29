import type {HTMLAttributes} from 'react';
import styles from '@organisms/TickerList/TickerList.module.css';
import cn from 'classnames';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import {QUERY_MOBILE} from '@utils/variables';

const TickerList = ({children, className}: HTMLAttributes<HTMLDivElement>) => {
    const isMobile = useAppMediaQuery(QUERY_MOBILE);
    const headerElement = isMobile
        ? null
        : <div className={styles.header}>
            <span className={styles.company}>Company</span>
            <span>Shares</span>
            <span>Price</span>
            <span>Avg. price</span>
            <span>Gain $</span>
            <span>Gain %</span>
            <span>Total</span>
        </div>;

    return (
        <div className={cn(styles.list, className)}>
            {headerElement}
            {children}
        </div>
    );
};

export default TickerList;
