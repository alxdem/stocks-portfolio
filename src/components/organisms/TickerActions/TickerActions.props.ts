import type {ComponentPropsWithoutRef} from 'react';

export interface TickerActionsProps extends ComponentPropsWithoutRef<'div'>{
    symbol: string;
    title: string;
    price: number;
}
