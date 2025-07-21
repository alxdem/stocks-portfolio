import type {ComponentPropsWithRef, ReactNode} from 'react';

export interface CloudSectionProps extends ComponentPropsWithRef<'div'> {
    children: ReactNode;
    title?: string;
}