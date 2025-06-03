import type {
    Theme,
    TickerDataExtended,
    TickersObject,
    GetOperationName,
    IsStringNumber,
    FormatPrice,
    Nullable,
    GetPercent,
    FormatHugeNumber,
} from '@models';
import {HugeNumberPower} from '@models';
import {appKey} from '@utils/variables';
import snp500SymbolList from '@fixtures/snp500list';

let scrollbarWidth: Nullable<number> = null;

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

const isStringNumber: IsStringNumber = (value) => {
    return typeof value === 'string' && !isNaN(Number(value));
};

export const formatPrice: FormatPrice = (value, isRound = false) => {
    if (isStringNumber(value)) {
        return `${(Number(value).toLocaleString())}`;
    } else if (typeof value === 'number') {
        const localValue = isRound ? Math.round(value) : Number(value.toFixed(2));
        return `${(localValue.toLocaleString())}`;
    } else {
        return value || '';
    }
}

export const getPercent: GetPercent = (basis, current) => {
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

export const scrollWidthGet = () => {
    const div = document.createElement('div');

    if (scrollbarWidth) {
        return scrollbarWidth;
    }

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    scrollbarWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollbarWidth;
};
