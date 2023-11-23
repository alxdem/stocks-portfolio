import { IChartPieDataItem } from '../components/ChartPie/ChartPie.props';
import {
    IChartPieCount,
    ChartPieType,
    IFormatPrice,
    IGainCount,
    IGainValueCount,
    IGetCompanyApiUrl,
    IFormatHugeNumber,
    HugeNumberPower
} from '../models/common';
import {
    COMPANY_INFO,
    FMP_API_KEY
} from './variables';

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

const chartPieCount: IChartPieCount = (currentList, tickerList, type) => {
    let obj: { [key: string]: number } = {};
    const resultArray: IChartPieDataItem[] = [];

    currentList.forEach(item => {
        const tickerInfo = tickerList.find(ticker => ticker.symbol === item.code);
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

export {
    formatPrice,
    chartPieCount,
    gainCount,
    gainPercentCount,
    getCompanyApiUrl,
    formatHugeNumber,
};