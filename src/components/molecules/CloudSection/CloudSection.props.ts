import type {ReactElement, HTMLAttributes} from 'react';

export interface CloudSectionProps extends HTMLAttributes<HTMLDivElement> {
    children: string | ReactElement | ReactElement[];
    title?: string;
}