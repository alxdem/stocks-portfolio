import type {MouseEvent} from 'react';
import type {ComponentPropsWithRef} from 'react';

export interface CounterProps extends ComponentPropsWithRef<'input'> {
    value: number;
    label?: string;
    min?: number;
    max?: number;
    reduce: (e: MouseEvent<HTMLButtonElement>) => void;
    increase: (e: MouseEvent<HTMLButtonElement>) => void;
}
