import type {SectorProps} from 'recharts';
import type {ReactElement} from 'react';

export interface ActiveShape {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    fill: string;
    name: string;
    percent: number;
    startAngle: number;
    endAngle: number;
    value: number;
}

export interface LegendPayload {
    value: string;
    payload: ActiveShape;
}

export interface RenderLegendProps {
    payload: LegendPayload[];
}

export type OnMouseEnter = (
    _props: SectorProps,
    index: number,
) => void;

export type RenderActiveShape = (
    props: unknown,
) => ReactElement<SVGElement>;