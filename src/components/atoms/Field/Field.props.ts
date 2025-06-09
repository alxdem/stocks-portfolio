import type {ComponentPropsWithRef} from 'react';

export interface FieldProps extends ComponentPropsWithRef<'input'>{
    label?: string;
    error?: string;
    isCentred?: boolean;
}
