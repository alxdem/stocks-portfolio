import type {ComponentPropsWithoutRef} from 'react';

export interface CreditCardProps extends ComponentPropsWithoutRef<'div'>{
    number?: string;
    expDate?: string;
    cvv?: string;
}
