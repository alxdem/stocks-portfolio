import type {ComponentPropsWithoutRef} from 'react';
import type {SortOrder, PortfolioSortType} from '@models';

export interface PortfolioHeaderProps extends ComponentPropsWithoutRef<'div'>{
    sort: PortfolioSortType;
    order: SortOrder;
    changeSort: (value: PortfolioSortType) => void;
}

export type PortfolioButton = {text: string;} | {text: string; value: PortfolioSortType};