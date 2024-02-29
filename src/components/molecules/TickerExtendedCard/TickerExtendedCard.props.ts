export interface ITickerExtendedCard {
    symbol: string;
    value: number;
    price: string;
    totalPrice: number;
    name?: string;
    key?: string;
    averagePrice: number;
    gain?: number;
    gainPercent?: number;
}