import { OperationType } from '../../../models/common';

export interface IOperationBasic {
    symbol: string;
    price: number;
    type: OperationType;
    value: number;
}

export interface IOperation extends IOperationBasic {
    date: number;
}

export interface IOperationCard extends IOperationBasic, React.HTMLAttributes<HTMLElement> {
    name: string;
    logo: string;
    time: string;
    date: string;
}