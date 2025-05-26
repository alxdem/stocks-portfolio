import type {HTMLAttributes, ReactElement} from 'react';
import type { OperationColor } from "@/models";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>{
    text: string;
    icon?: ReactElement<SVGElement>;
    color?: OperationColor;
}
