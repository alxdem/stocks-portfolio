import type {ComponentPropsWithoutRef} from 'react';
import type {Nullable} from '@models';

export interface ChartRangeProps extends ComponentPropsWithoutRef<'div'>{
    value: Nullable<number>;
    min?: number;
    max?: number;
}
