import type {FieldProps} from '@molecules/Field/Field.props';
import {Range} from 'react-range';
import type {ComponentProps} from 'react';

export interface AppRangeProps extends Omit<FieldProps, 'onChange'> {
    values: number[];
    step?: number;
    min?: number;
    max?: number;
    isMarks?: boolean;
    markStep?: number;
    onChange?: (value: number[]) => void;
}

type RangeProps = ComponentProps<typeof Range>;
export type RenderMarkParams = Parameters<NonNullable<RangeProps['renderMark']>>[0];
