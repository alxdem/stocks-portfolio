import type {ComponentPropsWithoutRef} from 'react';

export interface BalanceProps extends ComponentPropsWithoutRef<'div'>{
    title?: string;
    value?: string;
}
