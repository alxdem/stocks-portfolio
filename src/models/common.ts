import {OperationType, OperationColor, HugeNumberPower} from '@/models/dictionaries';

export type OperationKind = (typeof OperationType)[keyof typeof OperationType];

export type OperationColorCode = (typeof OperationColor)[keyof typeof OperationColor];

export type HugeNumberName = (typeof HugeNumberPower)[keyof typeof HugeNumberPower];

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
    balance: number;
    assetsWorth: number;
    operations: Nullable<Operation[]>;
    portfolio: Nullable<StockPosition[]>;
    formattedPortfolio: Nullable<StockPositionFormatted[]>;
}