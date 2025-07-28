import type {FieldProps} from '@molecules/Field/Field.props';
import type {NumberTuple} from '@models';

export interface RangeDoubleProps extends Omit<FieldProps, 'onChange'> {
    values: NumberTuple;
    step?: number;
    min?: number;
    max?: number;
    onChange?: (value: NumberTuple) => void;
}
