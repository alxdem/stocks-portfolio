import type {ComponentPropsWithRef} from 'react';

export interface OptionProps extends ComponentPropsWithRef<'input'>{
    type?: 'checkbox' | 'radio';
    text?: string;
    view?: 'standard' | 'badge';
}
