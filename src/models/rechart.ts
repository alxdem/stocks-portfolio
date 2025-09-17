import type {ComponentPropsWithoutRef} from 'react';
import {chartPeriods} from '@utils';

export interface ChartPieBasicData {
    name: string;
    value: number;
}

export interface ChartPieData extends ChartPieBasicData {
    percent: string;
    color?: string;
}

export interface ChartPieProps extends ComponentPropsWithoutRef<'svg'>{
    data: ChartPieData[];
    activeShapeIndex: number | undefined;
    isActiveShape?: boolean;
}

export type ChartPeriod = typeof chartPeriods[number];