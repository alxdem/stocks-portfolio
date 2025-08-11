import styles from '@organisms/PortfolioHeader/PortfolioHeader.module.css';
import type {PortfolioHeaderProps, PortfolioButton} from '@organisms/PortfolioHeader/PortfolioHeader.props';
import cn from 'classnames';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import {QUERY_MOBILE} from '@utils';
import ButtonSort from '@molecules/ButtonSort/ButtonSort';

const buttons: PortfolioButton[] = [
    {text: 'Company', value: 'symbol'},
    {text: 'Shares'},
    {text: 'Price'},
    {text: 'Avg. price'},
    {text: 'Gain $', value: 'gain'},
    {text: 'Gain %'},
    {text: 'Total', value: 'total'},
];

const PortfolioHeader = ({sort, order, changeSort, className}: PortfolioHeaderProps) => {
    const isMobile = useAppMediaQuery(QUERY_MOBILE);
    const headerElement = isMobile
        ? null
        : <div className={styles.header}>
            {buttons.map((item, index) => {
                return ('value' in item)
                    ? <ButtonSort
                        key={item.text}
                        text={item.text}
                        isAlignRight={index === 6}
                        isActive={sort === item.value}
                        order={order}
                        disabled={false}
                        onClick={() => changeSort(item.value)}
                    />
                    : <span key={item.text}>{item.text}</span>;
            })}
        </div>;

    return (
        <div className={cn(styles.list, className)}>
            {headerElement}
        </div>
    );
};

export default PortfolioHeader;
