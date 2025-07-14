import type {HTMLAttributes} from 'react';

export interface TickerHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    logo?: string;
    price?: string;
    sector?: string;
    change?: number;
    changePercentage?: number;
}
