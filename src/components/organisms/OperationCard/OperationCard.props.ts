import type {OperationBasic, OperationType} from '@/models';
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
    type: OperationType;
}

export interface OperationCardProps extends OperationBasic, HTMLAttributes<HTMLDivElement> {
    name: string;
    date: string;
    time: string;
    logo?: string;
}