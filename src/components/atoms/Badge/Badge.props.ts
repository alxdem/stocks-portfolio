import { OperationColor } from '../../../models/common';

export interface IBadge extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    icon?: JSX.Element;
    color?: OperationColor;
}