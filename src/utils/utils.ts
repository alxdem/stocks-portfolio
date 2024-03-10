import { IChartPieDataItem } from '../components/ChartPie/ChartPie.props';
import { snp500SymbolList } from '../assets/fixtures/snp500list';
import {
    IChartPieCount,
    ChartPieType,
    IFormatPrice,
    IGainCount,
    IGainValueCount,
    IGetCompanyApiUrl,
    IFormatHugeNumber,
    HugeNumberPower,
    IStockShortInfo,
    IStockExtendedInfo,
    IStocksObject,
    IGetPercent,
    IGainClass,
} from '@models/common';
import {
    COMPANY_INFO,
    FMP_API_KEY,
} from '@utils/variables';

const isStringNumber = (value: string | number | undefined) => {
    return typeof value === 'string' && !isNaN(Number(value));
};

const formatPrice: IFormatPrice = (value, isRound = false) => {
    if (isStringNumber(value)) {
        return `${(Number(value).toLocaleString())}`;
    } else if (typeof value === 'number') {
        const localValue = isRound ? Math.round(value) : Number(value.toFixed(2));
        return `${(localValue.toLocaleString())}`;
    } else {
        return value || '';
    }
};

const getPercent: IGetPercent = (value, total) => {
    return Math.round(value * 100 * 100 / total) / 100;
}

const formatHugeNumber: IFormatHugeNumber = (value) => {
    let numberValue = 0;

    if (typeof value === 'number') {
        numberValue = value;
    } else if (isStringNumber(value)) {
        numberValue = Number(value);
    } else {
        return '';
    }

    switch (numberValue.toString().length) {
        case 1:
            return `${(Number(value) / 1000).toFixed(3) + HugeNumberPower.Thousand}`;
        case 2:
            return `${(Number(value) / 1000).toFixed(3) + HugeNumberPower.Thousand}`;
        case 3:
            return `${(Number(value) / 1000).toFixed(3) + HugeNumberPower.Thousand}`;
        case 4:
            return `${(Number(value) / 1000).toFixed(3) + HugeNumberPower.Thousand}`;
        case 5:
            return `${(Number(value) / 1000).toFixed(2) + HugeNumberPower.Thousand}`;
        case 6:
            return `${(Number(value) / 1000).toFixed(1) + HugeNumberPower.Thousand}`;
        case 7:
            return `${(Number(value) / 1.0e6).toFixed(3) + HugeNumberPower.Million}`;
        case 8:
            return `${(Number(value) / 1.0e6).toFixed(2) + HugeNumberPower.Million}`;
        case 9:
            return `${(Number(value) / 1.0e6).toFixed(1) + HugeNumberPower.Million}`;
        case 10:
            return `${(Number(value) / 1.0e9).toFixed(3) + HugeNumberPower.Billion}`;
        case 11:
            return `${(Number(value) / 1.0e9).toFixed(2) + HugeNumberPower.Billion}`;
        case 12:
            return `${(Number(value) / 1.0e9).toFixed(1) + HugeNumberPower.Billion}`;
        case 13:
            return `${(Number(value) / 1.0e12).toFixed(3) + HugeNumberPower.Trillion}`;
        case 14:
            return `${(Number(value) / 1.0e12).toFixed(2) + HugeNumberPower.Trillion}`;
        case 15:
            return `${(Number(value) / 1.0e12).toFixed(1) + HugeNumberPower.Trillion}`;
        default:
            return '';
    }
};

const chartPieCount: IChartPieCount = (currentList, stocksData, type) => {
    let obj: { [key: string]: number } = {};
    const resultArray: IChartPieDataItem[] = [];

    currentList.forEach(item => {
        const tickerInfo = stocksData[item.symbol] || {};
        let name = '';

        switch (type) {
            case ChartPieType.Type:
                name = tickerInfo ? tickerInfo.type : '';
                break;
            case ChartPieType.Sector:
                name = (tickerInfo && tickerInfo.sector) ? tickerInfo.sector : 'Other';
                break;
            default:
                name = '';
        }

        if (!name) return [];

        const value = tickerInfo ? Math.round(tickerInfo.price * item.value) : 0;

        if (obj.hasOwnProperty.call(obj, name)) {
            obj[name] += value;
        } else {
            obj = { ...obj, [name]: value };
        }
    });

    for (const [key, value] of Object.entries(obj)) {
        resultArray.push({
            id: key,
            label: key,
            value: value
        });
    }

    return resultArray;
};

const gainCount: IGainValueCount = (averagePrice, currentPrice, value) => {
    if (typeof currentPrice !== 'number' || typeof averagePrice !== 'number') {
        return 0;
    }

    return (currentPrice - averagePrice) * value;
};

const gainPercentCount: IGainCount = (averagePrice, currentPrice) => {
    if (typeof currentPrice !== 'number' || typeof averagePrice !== 'number') {
        return 0;
    }

    const difference = currentPrice - averagePrice;

    return difference === 0 ? 0 : difference * 100 / averagePrice;
};

const getCompanyApiUrl: IGetCompanyApiUrl = (ticker) => {
    return `${COMPANY_INFO}/${ticker}?apikey=${FMP_API_KEY}`;
};

const isSnP500Include = (symbol: string | undefined): boolean => {
    return Boolean(symbol && snp500SymbolList.includes(symbol));
}

const createStocksObject = (stocks: IStockShortInfo[], stocksExtended: IStockExtendedInfo[]) => {
    if (!stocks.length || !stocksExtended.length) return {};

    const stocksObject: IStocksObject = {};

    const filteredStocks = stocks.filter((item: IStockShortInfo) => isSnP500Include(item.symbol));
    const filteredStocksExtended = stocksExtended.filter((item: IStockExtendedInfo) => isSnP500Include(item.symbol));

    filteredStocksExtended.forEach((stock: IStockExtendedInfo) => {
        const symbol = stock.symbol;

        if (typeof symbol !== 'string') return;

        const stockShortElement = filteredStocks.filter(item => item.symbol === symbol)[0];
        const name = stock.companyName || stockShortElement.name || '-';
        const type = stockShortElement.type || '-';
        const price = stock.price || 0;
        const exchangeShortName = stock.exchangeShortName || '-';
        const industry = stock.industry || '-';
        const country = stock.country || '-';
        const sector = stock.sector || '-';

        stocksObject[symbol] = {
            symbol,
            name,
            price,
            type,
            exchangeShortName,
            country,
            industry,
            sector,
        };
    });

    return stocksObject;
}

const gainClass: IGainClass = (value = 0, plusClass, minusClass) => {
    if (value === 0) return '';

    return value > 0 ? plusClass : minusClass;
};

export {
    formatPrice,
    chartPieCount,
    gainCount,
    gainPercentCount,
    getCompanyApiUrl,
    formatHugeNumber,
    isSnP500Include,
    createStocksObject,
    getPercent,
    gainClass,
};