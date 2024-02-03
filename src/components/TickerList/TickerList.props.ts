import { IStocksObject } from '../../models/common';
import { ITickerCard } from '../TickerCard/TickerCard.props';

export interface ITickerList {
    items: ITickerCard[];
    stocksData: IStocksObject;
    amount?: number;
}

export interface IDataTicker {
    symbol: string;
    name: string;
    price: number;
    exchange: string;
    exchangeShortName: string;
    type: string;
    industry?: string;
    sector?: string;
}