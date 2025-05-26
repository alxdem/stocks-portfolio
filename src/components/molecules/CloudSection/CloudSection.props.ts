import type {ReactElement, HTMLAttributes} from 'react';

export interface CloudSectionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement;
    title?: string;
}