import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ITickerHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    title?: string;
    logo?: string;
    price?: number;
    industry?: string;
    symbol?: string;
}