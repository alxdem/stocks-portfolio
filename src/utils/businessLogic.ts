import { IOperation } from '../components/molecules/OperationCard/OperationCard.props';
import { IPortfolioElement, IStocksObject, ITikerListData, OperationType } from '../models/common';
import { IOperationBasic } from '../components/molecules/OperationCard/OperationCard.props';
import { ITickerExtendedCard } from '../components/molecules/TickerExtendedCard/TickerExtendedCard.props';
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
    const portfolio: Record<string, IPortfolioElement> = {};

    operations.forEach(operation => {
        if (operation.type === OperationType.Refill) return;

        const symbol = operation.symbol;
        const price = stocksData[symbol].price || 0;

        if (symbol in portfolio) {
            const stockObject: IPortfolioElement = portfolio[symbol];

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
        const totalPriceice = element.price * element.value;
        const price = element.price.toString();

        result.push({
            symbol: key,
            price: price,
            averagePrice: element.averagePrice,
            value: element.value,
            gain: gain,
            gainPercent: gainP,
            totalPrice: totalPriceice,
        });
    }

    return result;
}

export const getBalanceCalculated = (portfolio: ITickerExtendedCard[]): number => {
    const result = portfolio.reduce((accumulator: number, currentValue) => accumulator + currentValue.totalPrice, 0);

    return result;
};

export const getTotalGain = (portfolio: ITickerExtendedCard[], currentBalance: number): number => {
    const averageResult = portfolio.reduce((accumulator: number, currentValue) => accumulator + currentValue.averagePrice * currentValue.value, 0);

    return currentBalance - averageResult;
}

export const getTotalCash = (operations: IOperationBasic[]): number => {
    const result = operations.reduce((accumulator: number, operation) => {
        switch (operation.type) {
            case OperationType.Purchase:
                return accumulator - operation.price * operation.value;
            case OperationType.Sale:
                return accumulator + operation.price * operation.value;
            case OperationType.Refill:
                return accumulator + operation.price;
            default:
                return 0;
        }
    }, 0);

    return result;
}