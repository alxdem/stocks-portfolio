import {OperationType, OperationColor} from '@/models/dictionaries';

export type OperationKind = (typeof OperationType)[keyof typeof OperationType];

export type OperationColorCode = (typeof OperationColor)[keyof typeof OperationColor];

export type Theme = 'light' | 'dark';

export type Nullable<T> = T | null;

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

export interface StoreStocksState {
    stocks: Nullable<TickersObject>;
}

export interface OperationBasic {
    price: number;
    value: number;
    type: OperationKind;
    symbol?: string;
}

export interface Operation extends OperationBasic {
    date: number;
}

export interface StockPositionBasic {
    symbol: string;
    name: string;
    sector?: string;
}

export interface StockPosition extends StockPositionBasic {
    value: number;
    price: number;
    totalPrice: number;
    averagePrice: number;
    gain: number;
    gainPercent?: number;
}

export interface StockPositionFormatted extends StockPositionBasic {
    value: string;
    price: string;
    totalPrice: string;
    averagePrice: string;
    gain: string;
    gainPercent: string;
    isLoss: boolean;
}

export interface UserState {
    operations: Nullable<Operation[]>;
    portfolio: Nullable<StockPosition[]>;
    formattedPortfolio: Nullable<StockPositionFormatted[]>;
}

export interface CompanyInfoData {
    symbol: string;
    price: number;
    marketCap: number;
    beta: number;
    change: number;
    changePercentage: number;
    volume: number;
    averageVolume: number;
    lastDividend: number;
    range: string;
    companyName: string;
    currency: string;
    cik: string;
    isin: string;
    cusip: string;
    exchangeFullName: string;
    exchange: string;
    industry: string;
    sector: string;
    website: string;
    description: string;
    ceo: string;
    country: string;
    fullTimeEmployees: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    image: string;
    ipoDate: string;
    defaultImage: boolean;
    isActivelyTrading: boolean;
    isAdr: boolean;
    isFund: boolean;
}