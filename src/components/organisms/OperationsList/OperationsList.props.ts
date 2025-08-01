import type {ComponentPropsWithoutRef} from 'react';
import type {Nullable, Operation} from '@models';

export interface OperationsListProps extends ComponentPropsWithoutRef<'div'> {
    items: Nullable<Operation[]>;
}
