import type {HTMLAttributes} from 'react';

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
    alt: string;
    src?: string;
}