import type {HTMLAttributes, ReactElement} from 'react';
import type { OperationColorCode } from "@models";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>{
    text: string;
    icon?: ReactElement<SVGElement>;
    color?: OperationColorCode;
}
