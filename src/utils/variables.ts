const FMP_API_URL = 'https://fmpcloud.io/api/v3';
export const FMP_API_KEY = import.meta.env.VITE_FMP_KEY;
export const STOCKS_DATA_URL = `${FMP_API_URL}/stock/list?apikey=${FMP_API_KEY}`;
export const STOCKS_EXTENDED_DATA_URL = `${FMP_API_URL}/stock-screener?limit=10000&exchange=NYSE,NASDAQ&apikey=${FMP_API_KEY}`;
export const COMPANY_INFO = `${FMP_API_URL}/profile`;
export const LOGO_API_URL = 'https://api.api-ninjas.com/v1/logo?ticker=';

export const RESOLUTION_MOB = 767;

export const QUERY_MOBILE = { query: `(max-width: ${RESOLUTION_MOB}px)` };

export const MODAL_ANIMATION_DELAY = 300;