import { IChartPieDataItem } from '../components/ChartPie/ChartPie.props';
import { IChartPieCount, ChartPieType } from '../models/common';

const formatPrice = (value: number | string) => {
    if (typeof value === 'number') {
        return `$${(Math.round(value).toLocaleString())}`;
    } else {
        return value;
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

export {
    formatPrice,
    chartPieCount,
};