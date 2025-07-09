import type {HTMLAttributes} from 'react';

export interface CompanyContactsProps extends HTMLAttributes<'div'> {
    address?: string;
    phone?: string;
    website?: string;
}
