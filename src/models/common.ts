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

export interface UserState {
    operations: Nullable<Operation[]>;
}