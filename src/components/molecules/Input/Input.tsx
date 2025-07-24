import type {InputProps} from '@molecules/Input/Input.props';
import styles from '@molecules/Input/Input.module.css';
import cn from 'classnames';
import InputMasked from '@molecules/Input/InputMasked/InputMasked';
import Field from '@molecules/Field/Field';
import {useState} from 'react';

const Input = ({
                   ref,
                   placeholder,
                   disabled,
                   label,
                   value,
                   error,
                   isCentred,
                   onChange,
                   onAccept,
                   className,
                   maskOptions,
                   name,
                   unmask,
               }: InputProps) => {
    const [isFocus, setIsFocus] = useState(false);

    const isErrorActive = Boolean(error && !isFocus);

    const classes = cn(
        isCentred && styles.centred,
        isErrorActive && styles.error,
        className,
    );

    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);

    const inputElement = maskOptions
        ? <InputMasked
            ref={ref}
            className={styles.input}
            value={value ? String(value) : ''}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            onAccept={onAccept}
            onFocus={handleFocus}
            onBlur={handleBlur}
            options={maskOptions}
            unmask={unmask}
        />
        : <input
            ref={ref}
            className={styles.input}
            type='text'
            value={value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
        />

    return (
        <Field
            className={classes}
            label={label}
            error={error}
            isErrorActive={isErrorActive}
        >
            {inputElement}
        </Field>
    );
};

export default Input;
