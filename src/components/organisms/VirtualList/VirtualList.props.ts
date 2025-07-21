import type {ComponentPropsWithoutRef} from 'react';

export interface VirtualListProps extends ComponentPropsWithoutRef<'div'>{
    itemHeight?: number;
    height?: number;
    isEnabled?: boolean;
}
