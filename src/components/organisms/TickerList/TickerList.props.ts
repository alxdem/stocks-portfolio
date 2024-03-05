import { OperationType } from '@models/common';
import { ITickerCard } from '@molecules/TickerCard/TickerCard.props';

export interface ITickerList {
    items: ITickerCard[];
}

export interface IDataTicker {
    symbol: string;
    name: string;
    price: number;
    exchange: string;
    exchangeShortName: string;
    type: OperationType;
    industry?: string;
    sector?: string;
}