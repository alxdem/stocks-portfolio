const operations = [
    { symbol: 'F', date: 1704031199999, price: 6.9, type: 'purchase', value: 4 },
    { symbol: 'BA', date: 1704078199000, price: 313.3, type: 'sale', value: 2 },
    { symbol: 'BAC', date: 1704021199000, price: 24.8, type: 'purchase', value: 5 },
    { symbol: 'F', date: 1702011193000, price: 6.82, type: 'purchase', value: 5 },
    { symbol: 'BA', date: 1704178399000, price: 310.1, type: 'purchase', value: 6 },
    { symbol: 'GE', date: 1704128192000, price: 112, type: 'purchase', value: 4 },
    { symbol: 'INTC', date: 1701128192000, price: 39.12, type: 'purchase', value: 8 },
];

const tikerListData = [
    { code: 'A', value: 6, averagePrice: 142 },
    { code: 'MA', value: 2, averagePrice: 410.3 },
    { code: 'F', value: 16, averagePrice: 6.9 },
    { code: 'IBM', value: 3, averagePrice: 169.9 },
    { code: 'AAPL', value: 6, averagePrice: 52.2 },
    { code: 'ADSK', value: 12, averagePrice: 215.6 },
    { code: 'BA', value: 3, averagePrice: 313.3 },
    { code: 'BAC', value: 32, averagePrice: 24.8 },
    { code: 'CMCSA', value: 6, averagePrice: 39.5 },
    { code: 'EA', value: 5, averagePrice: 109.6 },
    { code: 'GE', value: 4, averagePrice: 112 },
    { code: 'HBAN', value: 120, averagePrice: 10.11 },
    { code: 'INTC', value: 10, averagePrice: 39.12 },
    { code: 'JNJ', value: 7, averagePrice: 135.8 },
    { code: 'MOS', value: 12, averagePrice: 34.6 },
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