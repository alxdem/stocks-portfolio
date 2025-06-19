import type {GetCalculatedPortfolio, StockPosition, GetFormattedPortfolio, Operation, Nullable} from '@models';
import {formatNumber, getDifferencePercent, truncateValue} from '@utils/index';

export const getCalculatedPortfolio: GetCalculatedPortfolio = (operations, stockData) => {
    const portfolioObject: Record<string, StockPosition> = {};

    operations.forEach(operation => {
        const symbol = operation.symbol;
        const isNotPortfolioOperation = !symbol
            || operation.type === 'deposit'
            || operation.type === 'withdraw';

        if (isNotPortfolioOperation) {
            return;
        }

        const name = stockData[symbol].name;
        const price = stockData[symbol].price || 0;
        const sector = stockData[symbol].sector || '';

        if (Object.prototype.hasOwnProperty.call(portfolioObject, symbol)) {
            const itemObject = portfolioObject[symbol];

            if (operation.type === 'sale') {
                itemObject.value = itemObject.value - operation.value;
            } else {
                itemObject.value = itemObject.value + operation.value;
                itemObject.averagePrice = (itemObject.averagePrice * itemObject.value + operation.price * operation.value) / (itemObject.value + operation.value);
            }

            itemObject.totalPrice = price * itemObject.value;
            itemObject.gain = (price - itemObject.averagePrice) * itemObject.value;
            itemObject.gainPercent = getDifferencePercent(price, itemObject.averagePrice);
        } else {
            portfolioObject[symbol] = {
                symbol,
                name,
                price,
                sector,
                value: operation.value,
                averagePrice: operation.price,
                totalPrice: operation.value * price,
                gain: (price - operation.price) * operation.value,
                gainPercent: getDifferencePercent(price, operation.price),
            }
        }
    });

    const array = Object.values(portfolioObject);
    array.sort((a, b) => b.totalPrice - a.totalPrice);

    return array;
};

export const getFormattedPortfolio: GetFormattedPortfolio = (portfolio) => {
    return portfolio.map(item => {
        const isLoss = item.gain < 0;
        const gainLocal= formatNumber(item.gain, true, true);
        const percent = item.gainPercent ? `${formatNumber(item.gainPercent, true)}%` : '-';

        return {
            ...item,
            value: formatNumber(item.value),
            price: formatNumber(item.price, false, true),
            averagePrice: formatNumber(item.averagePrice,false, true),
            totalPrice: formatNumber(item.totalPrice, false, true),
            gain: gainLocal,
            gainPercent: percent,
            isLoss,
        };
    });
};

export const recalculateCash = (operations: Nullable<Operation[]>) => {
    if (!operations || operations.length < 1) {
        return 0;
    }

    const result = operations.reduce((acc, operation) => {
        const isNegative = operation.type === 'withdraw' || operation.type === 'purchase';
        const sign = isNegative ? -1 : 1;

        return acc + (operation.value * operation.price * sign);
    }, 0);

    return truncateValue(result);
};

export const recalculateMarketValue = (portfolio: Nullable<StockPosition[]>) => {
    if (!portfolio || portfolio.length < 1) {
        return 0;
    }

    const result = portfolio.reduce((acc, item) => {
        return acc + item.price * item.value;
    }, 0);

    return truncateValue(result);
};

export const getDepositValue = (operations: Nullable<Operation[]>) => {
    if (!operations || operations.length < 1) {
        return 0;
    }

    return operations.reduce((acc, operation) => {
        const type = operation.type;
        if (type === 'deposit' || type === 'withdraw') {
            const sign = type === 'withdraw' ? -1 : 1;

            return acc + operation.price * sign;
        } else {
            return acc;
        }
    }, 0);
}