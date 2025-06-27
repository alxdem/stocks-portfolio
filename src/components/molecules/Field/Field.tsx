import type {FieldProps} from '@molecules/Field/Field.props.ts';
import styles from '@molecules/Field/Field.module.css';
import cn from 'classnames';
import InputMasked from '@molecules/Field/InputMasked/InputMasked.tsx';
import {useState} from 'react';

const Field = ({
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
               }: FieldProps) => {
    const [isFocus, setIsFocus] = useState(false);

    const isErrorActive = Boolean(error && !isFocus);

    const classes = cn(
        styles.field,
        isErrorActive && styles.error,
        isCentred && styles.centred,
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
        <label className={classes}>
            {label && <span className={styles.label}>{label}</span>}
            {inputElement}
            {isErrorActive && <span className={styles.errorText}>{error}</span>}
        </label>
    );
};

export default Field;
