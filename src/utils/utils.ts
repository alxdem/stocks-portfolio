import { IChartPieDataItem } from '../components/ChartPie/ChartPie.props';
import { ITypeValueCount } from '../models/common';

const formatPrice = (value: number | string) => {
    if (typeof value === 'number') {
        return `$${(Math.round(value).toLocaleString())}`;
    } else {
        return value;
    }
};

const typeValueCount: ITypeValueCount = (currentList, tickerList) => {
    let obj: { [key: string]: number } = {};
    const resultArray: IChartPieDataItem[] = [];

    currentList.forEach(item => {
        const tickerInfo = tickerList.find(ticker => ticker.symbol === item.code);
        const type = tickerInfo ? tickerInfo.type : '';
        const value = tickerInfo ? Math.round(tickerInfo.price * item.value) : 0;

        if (obj.hasOwnProperty.call(obj, type)) {
            obj[type] += value;
        } else {
            obj = { ...obj, [type]: value };
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

const sectorValueCount: ITypeValueCount = (currentList, tickerList) => {
    let obj: { [key: string]: number } = {};
    const resultArray: IChartPieDataItem[] = [];

    currentList.forEach(item => {
        const tickerInfo = tickerList.find(ticker => ticker.symbol === item.code);
        const sector = (tickerInfo && tickerInfo.sector) ? tickerInfo.sector : 'Other';
        const value = tickerInfo ? Math.round(tickerInfo.price * item.value) : 0;

        if (obj.hasOwnProperty.call(obj, sector)) {
            obj[sector] += value;
        } else {
            obj = { ...obj, [sector]: value };
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

export {
    formatPrice,
    typeValueCount,
    sectorValueCount,
};