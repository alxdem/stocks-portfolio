import { OperationType } from '@models/common';

export interface IOperationCash extends React.HTMLAttributes<HTMLElement> {
    date: string;
    time: string;
    type: OperationType;
    value: number;
}