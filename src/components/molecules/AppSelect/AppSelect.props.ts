import type {FieldProps} from '@molecules/Field/Field.props';
import type {Props, SingleValue} from 'react-select';
import type {SelectOption} from '@models';

export interface AppSelectProps<T extends string> extends
    Omit<Props<SelectOption<T>, false>, 'onChange' | 'value'>,
    Pick<FieldProps, 'isErrorActive' | 'error' | 'label'>
{
    options: SelectOption<T>[];
    value?: T;
    onChange: (value: T) => void;
    onClear?: () => void;
}

export type AppSelectChangeType<T extends string> = SingleValue<SelectOption<T>>;
