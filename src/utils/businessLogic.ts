import { IOperation, OperationType } from '../components/OperationCard/OperationCard.props';
import { IStocksObject, ITikerListData } from '../models/common';
import { IOperationBasic } from '../components/OperationCard/OperationCard.props';
import { ITickerExtendedCard } from '../components/TickerExtendedCard/TickerExtendedCard.props';
import { gainCount, gainPercentCount } from './utils';

interface GetCalculatedPortfolio {
    (
        operations: IOperationBasic[],
        stocksData: IStocksObject,
    ): ITickerExtendedCard[];

}

export function isTicker(element: ITikerListData): element is ITikerListData {
    return 'symbol' in element && 'value' in element;
}

export function isOperation(element: unknown): element is IOperation {
    return typeof element === 'object' &&
        element !== null &&
        'symbol' in element &&
        'date' in element &&
        'price' in element &&
        'type' in element &&
        'value' in element;
}

export const getCalculatedPortfolio: GetCalculatedPortfolio = (operations, stocksData) => {
    const result: ITickerExtendedCard[] = [];
    const portfolio: Record<string, ITickerExtendedCard> = {};

    operations.forEach(operation => {
        const symbol = operation.symbol;
        const price = stocksData[symbol].price || 0;

        if (symbol in portfolio) {
            const stockObject: ITickerExtendedCard = portfolio[symbol];

            stockObject.price = price;

            if (operation.type === OperationType.Sale) {
                stockObject.averagePrice = (stockObject.averagePrice - operation.price) / 2;
                stockObject.value = stockObject.value - operation.value;
            } else {
                stockObject.averagePrice = (stockObject.averagePrice + operation.price) / 2;
                stockObject.value = stockObject.value + operation.value;
            }
        } else {
            portfolio[symbol] = {
                symbol: symbol,
                value: operation.value,
                price: price,
                averagePrice: operation.price,
            };
        }
    });

    for (const key in portfolio) {
        const element = portfolio[key];
        const gain = gainCount(element.averagePrice, element.price, element.value);
        const gainP = gainPercentCount(element.averagePrice, element.price);
        const prtotalPriceice = element.price * element.value;

        result.push({
            symbol: key,
            price: element.price,
            averagePrice: element.averagePrice,
            value: element.value,
            gain: gain,
            gainPercent: gainP,
            totalPrice: prtotalPriceice,
        });
    }

    return result;
}