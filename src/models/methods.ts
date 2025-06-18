import type {
    Nullable,
    Operation,
    OperationKind,
    StockPosition,
    StockPositionFormatted,
    TickersObject,
} from "@/models/common";

import type {ChartPieData} from '@/models/rechart';

export type GetOperationName = (
    stocksObj: TickersObject,
    type: OperationKind,
    symbol?: string,
) => string;

export type IsStringNumber = (value?: string | number) => boolean;

export type FormatPrice = (
    value: string | number,
    isRound?: boolean,
) => string;

export type GetCalculatedPortfolio = (
    operations: Operation[],
    stockData: TickersObject,
) => StockPosition[];

export type GetFormattedPortfolio = (
    portfolio: StockPosition[],
) => StockPositionFormatted[];

export type GetPercent = (
    basis: number,
    current: number,
) => number;

export type FormatHugeNumber = (
    value: number | string | undefined
) => string;

export type GetChartPie = (
    items: Nullable<StockPosition[]>,
    assetsWorth: number
) =>  ChartPieData[];