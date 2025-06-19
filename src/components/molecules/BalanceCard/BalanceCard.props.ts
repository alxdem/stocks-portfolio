import type {ComponentPropsWithoutRef} from 'react';

export interface BalanceCardProps extends ComponentPropsWithoutRef<'div'>{
    title?: string;
    value: number;
    deposit: number;
}
