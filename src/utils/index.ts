import type {
    Theme,
    TickerDataExtended,
    TickersObject,
    GetOperationName,
    IsStringNumber,
    FormatNumber,
    Nullable,
    GetPercent,
    FormatHugeNumber,
    ChartPieData,
    GetChartPie,
    GetAssetsTypesChartPie,
} from '@models';
import {HugeNumberPower} from '@models';
import {appKey, CHART_COLORS} from '@utils/variables';
import snp500SymbolList from '@fixtures/snp500list';

const getBody = () => document.querySelector('body');

const setTheme = (value: Theme) => {
    localStorage.setItem('theme', value);
    getBody()?.setAttribute(appKey.DATA_THEME, value);
};

export const themeSwitch = () => {
    const currentTheme = getBody()?.getAttribute(appKey.DATA_THEME);

    setTheme(currentTheme === 'light' ? 'dark' : 'light');
};

const isSnP500Include = (symbol: string | undefined): boolean => {
    return Boolean(symbol && snp500SymbolList.includes(symbol));
}

export const truncateValue = (value: number) => {
    return Math.floor((value) * 100) / 100;
}

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

const getRandomNumber = (min: number, max: number): number => {
    const minLocal = Math.ceil(min);
    const maxLocal = Math.floor(max);

    return Math.floor(Math.random() * (maxLocal - minLocal)) + minLocal;
};

export const fakeFetch = <T>(data: T, delay?: number): Promise<T> => {
    const min = 3;
    const max = 14;
    const factor = 100;
    const delayLocal = delay || getRandomNumber(min, max) * factor;

    return new Promise((resolve) => {
       setTimeout(() => {
           resolve(data);
       }, delayLocal);
    });
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
}

export const isStringNumber: IsStringNumber = (value) => {
    return typeof value === 'string' && !isNaN(Number(value));
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
}

export const getPercent: GetPercent = (basic, current) => {
    return current * 100 / basic;
};

export const getDifferencePercent: GetPercent = (basis, current) => {
    const difference = basis - current;

    return difference === 0 ? 0 : difference * 100 / basis;
};

export const getTickerUrl = (symbol: string) => {
    return `/stock/${symbol}`;
}

export const formatHugeNumber: FormatHugeNumber = (value) => {
    let numberValue = 0;

    if (typeof value === 'number') {
        numberValue = value;
    } else if (isStringNumber(value)) {
        numberValue = Number(value);
    } else {
        return '';
    }

    const partK = Number(value) / 1000;
    const partM = Number(value) / 1.0e6;
    const partB = Number(value) / 1.0e9;
    const partT = Number(value) / 1.0e12;

    switch (numberValue.toString().length) {
        case 1:
        case 2:
        case 3:
        case 4:
            return `${(partK).toFixed(3) + HugeNumberPower.Thousand}`;
        case 5:
            return `${(partK).toFixed(2) + HugeNumberPower.Thousand}`;
        case 6:
            return `${(partK).toFixed(1) + HugeNumberPower.Thousand}`;
        case 7:
            return `${(partM).toFixed(3) + HugeNumberPower.Million}`;
        case 8:
            return `${(partM).toFixed(2) + HugeNumberPower.Million}`;
        case 9:
            return `${(partM).toFixed(1) + HugeNumberPower.Million}`;
        case 10:
            return `${(partB).toFixed(3) + HugeNumberPower.Billion}`;
        case 11:
            return `${(partB).toFixed(2) + HugeNumberPower.Billion}`;
        case 12:
            return `${(partB).toFixed(1) + HugeNumberPower.Billion}`;
        case 13:
            return `${(partT).toFixed(3) + HugeNumberPower.Trillion}`;
        case 14:
            return `${(partT).toFixed(2) + HugeNumberPower.Trillion}`;
        case 15:
            return `${(partT).toFixed(1) + HugeNumberPower.Trillion}`;
        default:
            return '';
    }
};

export const getChartColor = (index: number) => {
    return CHART_COLORS[index % CHART_COLORS.length];
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
}

export const getSectorsChartPie: GetChartPie = (items, marketValue) => {
    if (!items || items.length < 1) {
        return [];
    }

    const sectors: Record<string, Omit<ChartPieData, 'percent'>> = {};

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
}

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
