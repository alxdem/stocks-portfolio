import type {ComponentPropsWithoutRef} from 'react';
import type {ChartPieBasicData} from '@models';

export interface ChartPieNeedleProps extends ComponentPropsWithoutRef<'svg'>{
    value: number;
    data: ChartPieBasicData[];
    min?: number;
    max?: number;
    text?: string;
}
