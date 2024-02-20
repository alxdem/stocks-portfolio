import { OperationType } from '../../components/OperationCard/OperationCard.props';

const operations = [
    { symbol: '-', date: 1700011199999, price: 10000, type: OperationType.Refill, value: 1 },
    { symbol: 'F', date: 1704031199999, price: 12.9, type: OperationType.Purchase, value: 4 },
    { symbol: 'BA', date: 1704078199000, price: 313.3, type: OperationType.Sale, value: 2 },
    { symbol: 'BAC', date: 1704021199000, price: 24.8, type: OperationType.Purchase, value: 5 },
    { symbol: 'F', date: 1702011193000, price: 12.82, type: OperationType.Purchase, value: 5 },
    { symbol: 'BA', date: 1704178399000, price: 310.1, type: OperationType.Purchase, value: 6 },
    { symbol: 'GE', date: 1704128192000, price: 112, type: OperationType.Purchase, value: 4 },
    { symbol: 'INTC', date: 1701128192000, price: 39.12, type: OperationType.Purchase, value: 8 },
];

const tikerListData = [
    { symbol: 'A', value: 6, averagePrice: 142 },
    { symbol: 'MA', value: 2, averagePrice: 410.3 },
    { symbol: 'F', value: 16, averagePrice: 6.9 },
    { symbol: 'IBM', value: 3, averagePrice: 169.9 },
    { symbol: 'AAPL', value: 6, averagePrice: 52.2 },
    { symbol: 'ADSK', value: 12, averagePrice: 215.6 },
    { symbol: 'BA', value: 3, averagePrice: 313.3 },
    { symbol: 'BAC', value: 32, averagePrice: 24.8 },
    { symbol: 'CMCSA', value: 6, averagePrice: 39.5 },
    { symbol: 'EA', value: 5, averagePrice: 109.6 },
    { symbol: 'GE', value: 4, averagePrice: 112 },
    { symbol: 'HBAN', value: 120, averagePrice: 10.11 },
    { symbol: 'INTC', value: 10, averagePrice: 39.12 },
    { symbol: 'JNJ', value: 7, averagePrice: 135.8 },
    { symbol: 'MOS', value: 12, averagePrice: 34.6 },
];

const totalData = [
    {
        id: 'td1',
        title: 'Balance',
        value: 110830,
    },
    {
        id: 'td2',
        title: 'Profit',
        value: 49884,
        percent: 81.85,
    },
    {
        id: 'td3',
        title: 'Yield',
        value: 16.25,
        type: 'percent',
    },
    {
        id: 'td4',
        title: 'Daily',
        value: 1283,
        percent: -2.17,
    }
];

export {
    tikerListData,
    totalData,
    operations,
}