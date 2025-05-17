export type Theme = 'light' | 'dark';

interface TickerBase {
    symbol: string;
    beta: number;
    price: number;
    exchange: string;
    exchangeShortName: string;
    country: string;
    industry: string;
    sector: string;
    marketCap: number;
    volume: number;
    lastAnnualDividend: number;
}

export interface TickerDataExtended extends TickerBase {
    companyName: string;
    isActivelyTrading: boolean;
    isEtf: boolean;
    isFund: boolean;
}

export interface TickerInfo extends TickerBase {
    name: string;
}

export interface TickersObject {
    [key: string]: TickerInfo;
}