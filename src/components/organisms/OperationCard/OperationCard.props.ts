import type {OperationBasic, OperationKind} from '@models';
import type {HTMLAttributes} from 'react';

// Card types 'deposit' or 'withdraw'
export interface OperationCardBasic extends HTMLAttributes<HTMLDivElement> {
    name: string;
    date: string;
    time: string;
    total: string;
    isTotalPlus?: boolean;
}

export interface OperationCardBasicWithType extends OperationCardBasic {
    type: OperationKind;
}

export interface OperationCardProps extends OperationBasic, HTMLAttributes<HTMLDivElement> {
    name: string;
    date: string;
    time: string;
}