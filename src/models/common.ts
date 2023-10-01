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

export interface IChartPieCount {
    (currentList: ITikerListData[], tickerList: IDataTicker[], type: ChartPieType): IChartPieDataItem[];
}