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