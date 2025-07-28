import type {InputMaskedProps} from '@molecules/Input/InputMasked/InputMasked.props.ts';
import {IMaskInput} from 'react-imask';
import {forwardRef, type FocusEvent} from 'react';

const InputMasked = forwardRef<HTMLInputElement, InputMaskedProps>(({className, value, placeholder, disabled, name, unmask = false, onAccept, onFocus, onCustomBlur, options}: InputMaskedProps, ref) => {
    const onInputChange = (value: string) => {
        if (onAccept) {
            onAccept(value);
        }
    };

    const onBlurLocal = (e: FocusEvent<HTMLInputElement>) => {
        onCustomBlur?.(e.target.value);
    };

    return (
        <IMaskInput
            inputRef={ref}
            className={className}
            value={value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            unmask={unmask}
            onAccept={onInputChange}
            onFocus={onFocus}
            onBlur={onBlurLocal}
            {...options}
        />
    );
});

export default InputMasked;