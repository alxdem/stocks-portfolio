import type {
    GetCalculatedPortfolio,
    StockPosition,
    GetFormattedPortfolio,
    Operation,
    Nullable,
    TickerDataExtended,
    TickersObject,
    GetOperationName,
    FormatNumber,
    GetChartPie,
    ChartPieData,
    ChartPieBasicData,
    GetAssetsTypesChartPie,
    GetSinglePercentChartPie,
    GetAddressString
} from '@models';
import {isStringNumber, truncateValue, getPercent, getDifferencePercent} from '@/utils/common';
import snp500SymbolList from '@fixtures/snp500list';
import {CHART_COLORS, CHART_INDICATOR_COLOR} from '@/utils/variables';

const isSnP500Include = (symbol: string | undefined): boolean => {
    return Boolean(symbol && snp500SymbolList.includes(symbol));
}

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
                const difference = itemObject.value - operation.value;

                if (difference > 1) {
                    itemObject.value = difference;
                } else {
                    delete portfolioObject[symbol];
                }
            } else {
                itemObject.value = itemObject.value + operation.value;
                itemObject.averagePrice = (itemObject.averagePrice * itemObject.value + operation.price * operation.value) / (itemObject.value + operation.value);
            }

            itemObject.totalPrice = price * itemObject.value;
            itemObject.gain = (price - itemObject.averagePrice) * itemObject.value;
            itemObject.gainPercent = getDifferencePercent(itemObject.averagePrice, price);
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
                gainPercent: getDifferencePercent(operation.price, price),
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
};

export const createStocksObject = (stocks: Nullable<TickerDataExtended[]>): TickersObject => {
    if (!stocks || stocks.length < 1) {
        return {};
    }

    const stocksObject: TickersObject = {};

    const filteredStocks = stocks.filter((item: TickerDataExtended) => {
        return isSnP500Include(item.symbol);
    });

    filteredStocks.forEach((stock: TickerDataExtended) => {
        const symbol = stock.symbol;

        if (!symbol) {
            return;
        }

        stocksObject[symbol] = {
            symbol,
            name: stock.companyName,
            beta: stock.beta,
            price: stock.price,
            exchange: stock.exchange,
            exchangeShortName: stock.exchangeShortName,
            country: stock.country,
            industry: stock.industry,
            sector: stock.sector,
            marketCap: stock.marketCap,
            volume: stock.volume,
            lastAnnualDividend: stock.lastAnnualDividend,
        };
    });

    return stocksObject;
};

export const getOperationName: GetOperationName = (stocksObj, type, symbol) => {
    switch (type) {
        case 'deposit':
            return 'deposit';
        case 'withdraw':
            return 'withdraw';
        default: {
            const name = symbol && stocksObj[symbol]?.name;
            return name || '-';
        }
    }
};

const formatPrice = (value: number): string => {
    return value < 0
        ? `-$${(value * -1).toLocaleString()}`
        : `$${value.toLocaleString()}`;
};

export const formatNumber: FormatNumber = (value, isRound = false, isPrice = false) => {
    if (isStringNumber(value)) {
        const numberValue = Number(value);

        return isPrice
            ? formatPrice(numberValue)
            : `${(numberValue.toLocaleString())}`;
    } else if (typeof value === 'number') {
        const localValue = isRound ? Math.round(value) : Number(value.toFixed(2));

        return isPrice
            ? formatPrice(localValue)
            : `${(localValue.toLocaleString())}`;
    } else {
        return value || '';
    }
};

export const getTickerUrl = (symbol: string) => {
    return `/stock/${symbol}`;
};

export const getChartColor = (index: number) => {
    return CHART_COLORS[index % CHART_COLORS.length];
};

export const getChartIndicatorColor = (index: number) => {
    return CHART_INDICATOR_COLOR[index % CHART_INDICATOR_COLOR.length];
};

export const getPortfolioChartPie: GetChartPie = (items, marketValue) => {
    if (!items || items.length < 1) {
        return [];
    }

    return items.map(item => {
        const value = item.value * item.price;
        const percent = getPercent(marketValue, value).toFixed(2);

        return {
            name: item.name,
            value,
            percent,
        };
    });
};

export const getSectorsChartPie: GetChartPie = (items, marketValue) => {
    if (!items || items.length < 1) {
        return [];
    }

    const sectors: Record<string, ChartPieBasicData> = {};

    items.forEach(item => {
        const value = item.value * item.price;
        const sector = item.sector || '';

        if (sectors[sector]) {
            sectors[sector].value += value;
        } else {
            sectors[sector] = {
                name: sector,
                value,
            }
        }
    });

    const result: ChartPieData[] = Object.values(sectors).map(sector => ({
        ...sector,
        percent: getPercent(marketValue, sector.value).toFixed(2),
    }));

    return result;
};

export const getAssetsTypesChartPie: GetAssetsTypesChartPie = (cash, assetsValue) => {
    const summ = cash + assetsValue;

    return [
        {
            name: 'Cash',
            value: cash,
            percent: getPercent(summ, cash).toFixed(2),
        },
        {
            name: 'Assets',
            value: assetsValue,
            percent: getPercent(summ, assetsValue).toFixed(2),
        }
    ];
};

export const operationMessage = (operation: Operation): string => {
    if (operation.type === 'deposit') {
        return `You have deposited into the account ${formatNumber(operation.price, false, true)}`;
    }

    if (operation.type === 'purchase') {
        return `You bought ${operation.value} shares for ${formatNumber(operation.value * operation.price, false, true)}`;
    }

    if (operation.type === 'sale') {
        return `You sold ${operation.value} shares for ${formatNumber(operation.value * operation.price, false, true)}`;
    }

    return `Operation for the amount of ${operation.value * operation.price} completed`;
}

export const getAddressString: GetAddressString = (
    address = '',
    city = '',
    state = '',
    country= '',
    zip = '',
) => {
    const stateZip = `${state} ${zip}`;

    return [address, city, stateZip, country].join(', ');
}

export const getSinglePercentChartPie: GetSinglePercentChartPie = (value, total) => {
    const remain = total - value;

    return [
        {
            name: 'value',
            value: value,
            percent: getPercent(total, value).toFixed(2),
            color: 'var(--color-primary-600)',
        },
        {
            name: 'remain',
            value: remain,
            percent: getPercent(total, remain).toFixed(2),
            color: 'var(--color-primary-200)',
        }
    ];
};

export const getChange = (value: number) => {
    const isFall = value < 0;
    const isRise = value > 0;
    const changeValue = formatNumber(Math.abs(value));

    let sign = '';

    if (isFall) {
        sign = '-';
    }

    if (isRise) {
        sign = '+';
    }

    return {changeValue, sign};
};