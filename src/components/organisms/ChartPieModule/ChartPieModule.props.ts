import type {HTMLAttributes} from 'react';
import type {ChartPieData} from '@models';

export interface ChartPieModuleProps extends HTMLAttributes<HTMLDivElement>{
    data: ChartPieData[];
}
