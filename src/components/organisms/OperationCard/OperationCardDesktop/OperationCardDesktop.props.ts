import type {OperationCardBasicWithType} from '@organisms/OperationCard/OperationCard.props';

export interface OperationCardDesktopProps extends OperationCardBasicWithType {
    value: string;
    price: string;
    symbol?: string;
}