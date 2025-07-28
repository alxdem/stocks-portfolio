import type {ComponentPropsWithRef} from 'react';

export interface FieldProps extends ComponentPropsWithRef<'div'> {
    label?: string;
    error?: string;
    isErrorActive?: boolean;
    as?: 'label' | 'div';
}
