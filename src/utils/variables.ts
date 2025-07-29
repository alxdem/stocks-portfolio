export const appKey = {
    DATA_THEME: 'data-theme',
    LS_DATA: 'stocks-data',
    LS_COMPANIES: 'companies-data',
    OPERATIONS: 'user-operations'
};

const FMP_API_URL = 'https://fmpcloud.io/api/v3';
const FMP_API_URL_NEW = 'https://financialmodelingprep.com';

export const FMP_API_KEY = import.meta.env.VITE_FMP_KEY;
export const FMP_API_NEW_KEY = import.meta.env.VITE_FMP_NEW_KEY;
export const STOCKS_DATA_URL = `${FMP_API_URL}/stock/list?apikey=${FMP_API_KEY}`;
export const STOCKS_EXTENDED_DATA_URL = `${FMP_API_URL}/stock-screener?limit=10000&exchange=NYSE,NASDAQ&apikey=${FMP_API_KEY}`;
export const TICKER_DATA_URL = `${FMP_API_URL_NEW}/stable/profile?apikey=${FMP_API_NEW_KEY}&symbol=`;
export const GOOGLE_MAP_SEARCH_URL = 'https://www.google.com/maps/search/';
export const GOOGLE_SEARCH_URL = 'https://www.google.com/search?q=';
export const LOGO_URL = 'https://snp500-logos.netlify.app/logos'

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
    'var(--cc-color-1)',
    'var(--cc-color-2)',
    'var(--cc-color-3)',
    'var(--cc-color-4)',
    'var(--cc-color-5)',
];

export const CHART_INDICATOR_COLOR = [
    'var(--cc-indicator-color-1)',
    'var(--cc-indicator-color-2)',
    'var(--cc-indicator-color-3)',
];

export const message = {
    REQUIRED: 'Please fill in the field',
    INCORRECT: 'Please enter correct data',
};

export const BETA_MAX = 2; // β - measures a stock's volatility relative to the overall market

export const MIN_AVG_MAX_DEFAULT_VALUE = {
    min: 0,
    avg: 0,
    max: 0,
}

export const sortButtons = [
    {text: 'Company', value: 'symbol'},
    {text: 'Sector', value: 'sector'},
    {text: 'Price', value: 'price'},
] as const;