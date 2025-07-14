import type {ComponentPropsWithoutRef} from 'react';

export interface TickerInPortfolioProps extends ComponentPropsWithoutRef<'div'>{
    symbol: string;
    price?: number;
}
