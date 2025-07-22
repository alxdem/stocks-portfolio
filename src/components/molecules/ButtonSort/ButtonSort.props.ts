import type {ComponentPropsWithoutRef} from 'react';
import type {SortOrder} from '@models';

export interface ButtonSortProps extends ComponentPropsWithoutRef<'button'>{
    text?: string;
    order?: SortOrder;
    isActive?: boolean;
    isAlignRight?: boolean;
}
