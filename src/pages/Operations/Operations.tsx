import {useAppSelector} from '@/store/hooks';
import CloudSection from '@molecules/CloudSection/CloudSection';
import OperationCard from '@organisms/OperationCard/OperationCard';
import styles from '@pages/Operations/Operations.module.css';
import {getOperationName} from '@/utils';

const OperationsPage = () => {
    const operations = useAppSelector((state => state.user.operations));
    const stocksObj = useAppSelector((state) => state.stocks.stocks);

    let elements;

    if (!operations || !stocksObj) {
        elements = <p>Data is loading</p>
    } else if (operations.length < 1) {
        elements = <p>Operations not found</p>
    } else {
        elements = operations.map((operation) => {
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
        });
    }

    return (
        <section>
            <CloudSection>
                <div className={styles.items}>
                    {elements}
                </div>
            </CloudSection>
        </section>
    );
};

export default OperationsPage;