import type {OperationKind, TickersObject} from "@/models/common";

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