import styles from '@organisms/OperationsList/OperationsList.module.css';
import { useSelector } from 'react-redux';
import { IOperationsList } from '@organisms/OperationsList/OperationsList.props';
import { useMediaQuery } from 'react-responsive';
import { OperationType } from '@models/common';
import OperationCard from '@molecules/OperationCard/OperationCard';
import OperationCardMob from '@molecules/OperationCardMob/OperationCardMob';
import OperationCashCard from '@molecules/OperationCashCard/OperationCashCard';
import { QUERY_MOBILE } from '@utils/variables';
import { RootState } from 'store';


const OperationsList = ({ operations }: IOperationsList) => {
    const isMobile = useMediaQuery(QUERY_MOBILE);
    const stocksData = useSelector((state: RootState) => state.stocks.stocks);
    const isStocksDataLoading = useSelector((state: RootState) => state.stocks.isLoading);

    let elements;

    if (isStocksDataLoading) {
        elements = <div>Data is loading...</div>
    } else if (!isStocksDataLoading && operations.length < 1) {
        elements = <div>Operations not found</div>
    } else {
        elements = [...operations]
            .sort((a, b) => (b.date - a.date))
            .map(operation => {
                const logoSrc = '';
                const dateRaw = new Date(operation.date);
                const date = dateRaw.toLocaleDateString();
                const time = dateRaw.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                if (operation.type === OperationType.Refill) {
                    return (
                        <OperationCashCard
                            key={operation.date.toString()}
                            type={operation.type}
                            date={date}
                            time={time}
                            value={operation.price}
                        />
                    );
                }

                const name = stocksData[operation.symbol].name;

                if (isMobile) {
                    return (
                        <OperationCardMob
                            key={operation.date.toString()}
                            name={name}
                            symbol={operation.symbol}
                            type={operation.type}
                            price={operation.price}
                            date={date}
                            time={time}
                            value={operation.value}
                            logo={logoSrc}
                        />
                    );
                }

                return (
                    <OperationCard
                        key={operation.date.toString()}
                        name={name}
                        symbol={operation.symbol}
                        type={operation.type}
                        price={operation.price}
                        date={date}
                        time={time}
                        value={operation.value}
                        logo={logoSrc}
                    />
                );
            });
    }

    return (
        <div className={styles.list}>
            {elements}
        </div>
    );
}

export default OperationsList;