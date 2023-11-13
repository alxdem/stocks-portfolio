import { IChartPieDataItem } from '../components/ChartPie/ChartPie.props';
import { IChartPieCount, ChartPieType, IFormatPrice, IGainCount, IGainValueCount } from '../models/common';

const formatPrice: IFormatPrice = (value, isRound = false) => {
    if (typeof value === 'number') {
        const localValue = isRound ? Math.round(value) : Number(value.toFixed(2));
        return `${(localValue.toLocaleString())}`;
    } else {
        return value || '';
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

export {
    formatPrice,
    chartPieCount,
    gainCount,
    gainPercentCount,
};