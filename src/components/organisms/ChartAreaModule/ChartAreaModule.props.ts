import type {ComponentPropsWithRef} from 'react';

export interface ChartAreaModuleProps extends ComponentPropsWithRef<'div'> {
    ticker: string;
    xAxisLabel?: string;
}
