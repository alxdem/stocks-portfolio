import type {ComponentPropsWithRef} from 'react';

export interface FieldProps extends ComponentPropsWithRef<'label'> {
    label?: string;
    error?: string;
    isErrorActive?: boolean;
}
