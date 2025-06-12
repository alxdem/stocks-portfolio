export const appKey = {
    DATA_THEME: 'data-theme',
    LS_DATA: 'stocks-data',
    OPERATIONS: 'user-operations'
};

const FMP_API_URL = 'https://fmpcloud.io/api/v3';
export const FMP_API_KEY = import.meta.env.VITE_FMP_KEY;
export const STOCKS_DATA_URL = `${FMP_API_URL}/stock/list?apikey=${FMP_API_KEY}`;
export const STOCKS_EXTENDED_DATA_URL = `${FMP_API_URL}/stock-screener?limit=10000&exchange=NYSE,NASDAQ&apikey=${FMP_API_KEY}`;

const resolution = {
    mobile: 767,
    tablet: 991,
    desktopSm: 1279,
};

export const QUERY_MOBILE = `(max-width: ${resolution.mobile}px)`;
export const QUERY_TABLET = `(max-width: ${resolution.tablet}px)`;
export const QUERY_DESKTOP_SM = `(max-width: ${resolution.desktopSm}px)`;
export const MODAL_ANIMATION_DELAY = 300;

export const CHART_COLORS = [
    'var(--rc-color-1)',
    'var(--rc-color-2)',
    'var(--rc-color-3)',
    'var(--rc-color-4)',
    'var(--rc-color-5)',
];