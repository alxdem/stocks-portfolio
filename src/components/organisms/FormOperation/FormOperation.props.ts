import type {ComponentPropsWithoutRef} from 'react';
import type {OperationKind} from '@models';

export interface FormOperationProps extends ComponentPropsWithoutRef<'form'> {
    price: number;
    maxSteps: number;
    type: OperationKind;
    symbol: string;
}
