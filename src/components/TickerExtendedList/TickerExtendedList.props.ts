import { ITickerExtendedCard } from '../TickerExtendedCard/TickerExtendedCard.props';
import { ITickerList } from '../TickerList/TickerList.props';

export interface ITickerExtendedList extends ITickerList {
    items: ITickerExtendedCard[];
}