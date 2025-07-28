import type {ChangeEvent, ComponentPropsWithRef} from 'react';
import type { MaskedPatternOptions, MaskedNumberOptions } from 'imask';

type BaseFieldProps = Omit<ComponentPropsWithRef<'input'>, 'onChange'> & {
    label?: string;
    error?: string;
    isCentred?: boolean;
    unmask?: boolean;
    onCustomBlur?: (value: string) => void;
}

type PlainFieldProps = BaseFieldProps & {
    maskOptions?: never;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onAccept?: never;
}

type MaskedInputProps = BaseFieldProps & {
    maskOptions: MaskedPatternOptions | MaskedNumberOptions;
    onAccept?: (value: string) => void;
    onChange?: never;
}

export type InputProps = PlainFieldProps | MaskedInputProps;
