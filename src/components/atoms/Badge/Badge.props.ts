import type {HTMLAttributes, ReactElement, SVGProps} from 'react';
import type { OperationColorCode } from '@models';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>{
    text: string;
    icon?: ReactElement<SVGProps<SVGElement>>;
    color?: OperationColorCode;
    size?: 'md' | 'lg';
}
