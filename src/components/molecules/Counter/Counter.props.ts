import type {FieldProps} from '@atoms/Field/Field.props';
import type {MouseEvent} from 'react';

export interface CounterProps extends FieldProps {
    value: number;
    min?: number;
    max?: number;
    reduce: (e: MouseEvent<HTMLButtonElement>) => void;
    increase: (e: MouseEvent<HTMLButtonElement>) => void;
}
