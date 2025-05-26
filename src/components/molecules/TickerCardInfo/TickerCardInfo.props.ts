import type {HTMLAttributes} from 'react';

export interface TickerCardInfoProps extends HTMLAttributes<HTMLDivElement> {
    symbol?: string;
    name?: string;
    logo?: string;
}