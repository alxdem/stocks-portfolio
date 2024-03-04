import { ITickerExtendedCard } from '@molecules/TickerExtendedCard/TickerExtendedCard.props';
import { ITickerList } from '@organisms/TickerList/TickerList.props';

export interface ITickerExtendedList extends ITickerList {
    items: ITickerExtendedCard[];
}