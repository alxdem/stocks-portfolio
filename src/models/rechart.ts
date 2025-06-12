import type {ComponentPropsWithoutRef} from 'react';

export interface ChartPieData {
    name: string;
    value: number;
    percent: string;
}

export interface ChartPieProps extends ComponentPropsWithoutRef<'svg'>{
    data: ChartPieData[];
    activeShapeIndex: number | undefined;
}