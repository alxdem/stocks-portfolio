import type {
    Theme,
    TickerDataExtended,
    TickersObject,
    GetOperationName,
    IsStringNumber,
    FormatPrice,
    Nullable,
} from '@models';
import {appKey} from '@utils/variables';
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

