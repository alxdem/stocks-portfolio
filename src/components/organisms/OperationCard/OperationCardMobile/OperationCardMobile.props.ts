import type {OperationCardBasic} from '@organisms/OperationCard/OperationCard.props';

export interface OperationCardMobileProps extends OperationCardBasic {
    value: string;
    price: string;
    logo?: string;
}