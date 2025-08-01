import type {OperationsListProps} from '@organisms/OperationsList/OperationsList.props';
import styles from '@organisms/OperationsList/OperationsList.module.css';
import {useAppSelector} from '@/store/hooks';
import {selectStocks} from '@/store/selectors/stocksSelectors';
import {getOperationName, sortOperations} from '@utils';
import {useMemo} from 'react';
import OperationCard from '@organisms/OperationCard/OperationCard';

const OperationsList = ({items}: OperationsListProps) => {
    const stocksObj = useAppSelector(selectStocks);
    const sortedOperations = useMemo(() => sortOperations(items), [items]);

    if (!items || !stocksObj) {
        return <p>Data is loading</p>;
    }

    if (items.length < 1) {
        return <p>No operations found</p>;
    }

    return (
        <div className={styles.list}>
            {sortedOperations.map((operation) => {
                const name = getOperationName(stocksObj, operation.type, operation.symbol);
                const dateRaw = new Date(operation.date);
                const date = dateRaw.toLocaleDateString();
                const time = dateRaw.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });

                return (
                    <OperationCard
                        key={operation.date + name}
                        symbol={operation.symbol}
                        price={operation.price}
                        value={operation.value}
                        type={operation.type}
                        name={name}
                        date={date}
                        time={time}
                    />
                );
            })}
        </div>
    );
};

export default OperationsList;
