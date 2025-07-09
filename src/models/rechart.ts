import type {ComponentPropsWithoutRef} from 'react';

export interface ChartPieBasicData {
    name: string;
    value: number;
}

export interface ChartPieData extends ChartPieBasicData {
    percent: string;
}

export interface ChartPieProps extends ComponentPropsWithoutRef<'svg'>{
    data: ChartPieData[];
    activeShapeIndex: number | undefined;
}