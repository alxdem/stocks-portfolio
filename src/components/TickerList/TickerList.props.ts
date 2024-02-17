import { IStocksObject } from '../../models/common';
import { OperationType } from '../OperationCard/OperationCard.props';
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
    type: OperationType;
    industry?: string;
    sector?: string;
}