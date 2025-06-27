import type {IMaskInputProps} from 'react-imask';
import type { MaskedPatternOptions, MaskedNumberOptions } from 'imask';

export type InputMaskedProps = IMaskInputProps<HTMLInputElement> & {
    name?: string;
    options?: MaskedPatternOptions | MaskedNumberOptions;
    onAccept?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}