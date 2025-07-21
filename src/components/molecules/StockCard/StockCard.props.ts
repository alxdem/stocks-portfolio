import type {ComponentPropsWithRef} from 'react';

export interface StockCardProps extends ComponentPropsWithRef<'a'>{
    symbol: string;
    name: string;
    sector: string;
    price: string;
}
