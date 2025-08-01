import type {ComponentPropsWithoutRef} from 'react';
import type {TabItem} from '@models';

export interface TabsProps extends ComponentPropsWithoutRef<'div'>{
    tabs: TabItem[];
    initialTab?: number;
    isGap?: boolean;
}
