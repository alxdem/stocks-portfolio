import { ITickerCard } from '../TickerCard/TickerCard.props';

export interface ITickerList {
    items: ITickerCard[];
    tickerData: IDataTicker[];
}

interface IDataTicker {
    symbol: string;
    name: string;
    price: number;
    exchange: string;
    exchangeShortName: string;
    type: string;
}