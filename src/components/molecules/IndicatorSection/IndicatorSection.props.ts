import type {ComponentPropsWithoutRef, ReactElement, ReactNode} from 'react';

export interface IndicatorSectionProps extends ComponentPropsWithoutRef<'div'>{
    title?: string;
    info?: ReactNode;
    children?: ReactElement<{className?: string}>;
}
