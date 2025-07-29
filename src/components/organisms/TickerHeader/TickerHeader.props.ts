import type {HTMLAttributes} from 'react';

export interface TickerHeaderProps extends HTMLAttributes<HTMLDivElement> {
    symbol?: string;
    title?: string;
    price?: string;
    sector?: string;
    change?: number;
    changePercentage?: number;
}
