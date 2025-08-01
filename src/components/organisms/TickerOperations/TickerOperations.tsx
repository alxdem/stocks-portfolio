import type {TickerOperationsProps} from '@organisms/TickerOperations/TickerOperations.props';
import styles from '@organisms/TickerOperations/TickerOperations.module.css';
import CloudSection from '@molecules/CloudSection/CloudSection';
import {selectOperations} from '@/store/selectors/userSelectors';
import {useAppSelector} from '@/store/hooks';
import OperationsList from '@organisms/OperationsList/OperationsList';

const TickerOperations = ({symbol}: TickerOperationsProps) => {
    const operations = useAppSelector(selectOperations);
    const tickerOperations = operations?.filter(operation => operation.symbol === symbol) || null;

    return (
        <CloudSection className={styles.main}>
            <OperationsList items={tickerOperations}/>
        </CloudSection>
    );
};

export default TickerOperations;
