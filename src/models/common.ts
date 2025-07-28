import {OperationType, OperationColor} from '@/models/dictionaries';
import {sortButtons} from '@utils';

export type OperationKind = (typeof OperationType)[keyof typeof OperationType];

export type OperationColorCode = (typeof OperationColor)[keyof typeof OperationColor];

export type Theme = 'light' | 'dark';

export type Nullable<T> = T | null;

export type NumbersObject = Record<string, number[]>;

export type SectorsObject = Record<string, Sector>;

export type TickersObject = Record<string, TickerInfo>;

export type SetTimer = Nullable<ReturnType<typeof setTimeout>>;

export type SortOrder = 'asc' | 'desc';

export type SortType = typeof sortButtons[number]['value'];

export type NumberTuple = [number, number];

export type DoubleRange = Nullable<NumberTuple>;

interface Sector {
    dividends: MinAvgMax;
    betas: MinAvgMax;
}

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

export interface MinMax {
    min: number;
    max: number;
}

export interface MinAvgMax extends MinMax {
    avg: number;
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

export interface StoreStocksState {
    stocks: Nullable<TickersObject>;
    sectors: Nullable<SectorsObject>;
    dividends: Nullable<MinAvgMax>;
    beta: Nullable<MinAvgMax>;
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

export interface SelectOption<T extends string = string> {
    value: T;
    label: string;
}