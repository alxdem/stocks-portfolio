import type {InputMaskedProps} from '@molecules/Field/InputMasked/InputMasked.props.ts';
import {IMaskInput} from 'react-imask';
import {forwardRef} from 'react';

const InputMasked = forwardRef<HTMLInputElement, InputMaskedProps>(({className, value, placeholder, disabled, name, unmask = false, onAccept, onFocus, onBlur, options}: InputMaskedProps, ref) => {
    const onInputChange = (value: string) => {
        if (onAccept) {
            onAccept(value);
        }
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
            onBlur={onBlur}
            {...options}
        />
    );
});

export default InputMasked;