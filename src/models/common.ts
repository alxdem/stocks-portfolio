import { IChartPieDataItem } from '../components/ChartPie/ChartPie.props';
import { IDataTicker } from '../components/TickerList/TickerList.props';

export interface ILayout {
    children: string | JSX.Element | JSX.Element[];
}

export interface IStockShortInfo {
    exchange?: string;
    exchangeShortName?: string;
    name?: string;
    price?: number;
    symbol?: string;
    type?: string;
}

export interface ITikerListData {
    code: string;
    value: number;
}

export enum ChartPieType {
    Type = 'type',
    Sector = 'sector'
}

export enum HugeNumberPower {
    Thousand = 'K',
    Million = 'M',
    Billion = 'B',
    Trillion = 'T'
}

export interface IChartPieCount {
    (
        currentList: ITikerListData[],
        tickerList: IDataTicker[],
        type: ChartPieType
    ): IChartPieDataItem[];
}

export interface IFormatPrice {
    (
        value: number | string | undefined,
        isRound?: boolean
    ): string;
}

export interface IFormatHugeNumber {
    (value: number | string | undefined): string;
}

export interface IGainCount {
    (
        averagePrice: number | undefined,
        currentPrice: number | undefined
    ): number;
}

export interface IGainValueCount {
    (
        averagePrice: number | undefined,
        currentPrice: number | undefined,
        value: number
    ): number;
}

export interface IGetCompanyApiUrl {
    (ticker: string): string;
}

export interface ITickerPage {
    companyName?: string;
    address?: string;
    beta?: number;
    ceo?: number;
    changes?: number;
    city?: string;
    country?: string;
    currency?: string;
    description?: string;
    exchange?: string;
    exchangeShortName?: string;
    fullTimeEmployees?: number;
    image?: string;
    industry?: string;
    ipoDate?: string;
    isin?: string;
    lastDiv?: number;
    mktCap?: number;
    phone?: string;
    price?: number;
    range?: string;
    sector?: string;
    symbol?: string;
    volAvg?: number;
    website?: string;
    zip?: string;
}