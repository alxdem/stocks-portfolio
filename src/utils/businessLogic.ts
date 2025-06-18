import type {GetCalculatedPortfolio, StockPosition, GetFormattedPortfolio, Operation} from '@models';
import {formatPrice, getDifferencePercent} from '@utils/index';

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
        const gainLocal = isLoss
            ? `-$${formatPrice(item.gain * -1, true)}`
            : `$${formatPrice(item.gain, true)}`;
        const percent = item.gainPercent ? `${formatPrice(item.gainPercent, true)}%` : '-';

        return {
            ...item,
            value: formatPrice(item.value),
            price: `$${formatPrice(item.price)}`,
            averagePrice: `$${formatPrice(item.averagePrice)}`,
            totalPrice: `$${formatPrice(item.totalPrice)}`,
            gain: gainLocal,
            gainPercent: percent,
            isLoss,
        };
    });
};

export const recalculateBalance = (operations: Operation[]) => {
    const result = operations.reduce((acc, operation) => {
        const isNegative = operation.type === 'withdraw' || operation.type === 'purchase';
        const sign = isNegative ? -1 : 1;

        return acc + (operation.value * operation.price * sign);
    }, 0);

    return Math.floor(result * 100) / 100;
};

export const recalculateWorth = (portfolio: StockPosition[]) => {
    const result = portfolio.reduce((acc, item) => {
        return acc + item.price * item.value;
    }, 0);

    return Math.floor(result * 100) / 100;
};