import { IChartPie } from '../components/ChartPie/ChartPie.props';
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

    const arr = currentList.map(item => {
        const tickerInfo = tickerList.find(ticker => ticker.symbol === item.code);
        const type = tickerInfo ? tickerInfo.type : '';
        const value = tickerInfo ? Math.round(tickerInfo.price * item.value) : 0;

        console.log('value', value);

        if (obj.hasOwnProperty.call(obj, type)) {
            obj[type] += value;
        } else {
            obj = { ...obj, [type]: value };
        }

        console.log('tickerInfo', tickerInfo);
        console.log('obj', obj);

        return '';
    });

    console.log('arr', arr);

    return 'd';
};

export {
    formatPrice,
    typeValueCount,
};