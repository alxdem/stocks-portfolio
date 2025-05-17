export const appKey = {
    DATA_THEME: 'data-theme',
    LS_DATA: 'stocks-data'
};

const FMP_API_URL = 'https://fmpcloud.io/api/v3';
export const FMP_API_KEY = import.meta.env.VITE_FMP_KEY;
export const STOCKS_DATA_URL = `${FMP_API_URL}/stock/list?apikey=${FMP_API_KEY}`;
export const STOCKS_EXTENDED_DATA_URL = `${FMP_API_URL}/stock-screener?limit=10000&exchange=NYSE,NASDAQ&apikey=${FMP_API_KEY}`;