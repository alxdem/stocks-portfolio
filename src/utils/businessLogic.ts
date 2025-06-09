import type {GetCalculatedPortfolio, StockPosition, GetFormattedPortfolio, Operation} from '@models';
import {formatPrice, getPercent} from '@utils/index';

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
            itemObject.gainPercent = getPercent(price, itemObject.averagePrice);
        } else {
            portfolioObject[symbol] = {
                symbol,
                name,
                price,
                value: operation.value,
                averagePrice: operation.price,
                totalPrice: operation.value * operation.price,
                gain: (price - operation.price) * operation.value,
                gainPercent: getPercent(price, operation.price),
            }
        }
    });

    return Object.values(portfolioObject);
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