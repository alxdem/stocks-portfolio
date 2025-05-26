export const OperationType = {
    Purchase: 'purchase',
    Sale: 'sale',
    Withdraw: 'withdraw',
    Deposit: 'deposit',
} as const;

export const OperationColor = {
    Green: 'green',
    Red: 'red',
    Gray: 'gray',
} as const;

export type OperationType = (typeof OperationType)[keyof typeof OperationType];

export type OperationColor = (typeof OperationColor)[keyof typeof OperationColor];

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

export interface StoreStocksState {
    stocks: TickersObject | null;
}

export interface OperationBasic {
    price: number;
    value: number;
    type: OperationType;
    symbol?: string;
}

export interface Operation extends OperationBasic {
    date: number;
}

export interface UserState {
    operations: Operation[] | null; // TODO: Rewrite all '| null' to generic
}

export type GetOperationName = (
    stocksObj: TickersObject,
    type: OperationType,
    symbol?: string,
) => string;

export type IsStringNumber = (value?: string | number) => boolean;

export type FormatPrice = (
    value: string | number,
    isRound?: boolean,
) => string;