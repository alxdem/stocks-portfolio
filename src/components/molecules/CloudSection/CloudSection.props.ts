import type {HTMLAttributes, ReactNode} from 'react';

export interface CloudSectionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    title?: string;
}