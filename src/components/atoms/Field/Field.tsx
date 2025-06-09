import type {FieldProps} from '@atoms/Field/Field.props.ts';
import styles from '@atoms/Field/Field.module.css';
import cn from 'classnames';

const Field = ({ref, placeholder, disabled, label, value, error, isCentred, onChange, className}: FieldProps) => {
    const classes = cn(
        styles.field,
        error && styles.error,
        isCentred && styles.centred,
        className,
    );

    return (
        <label className={classes}>
            {label && <span className={styles.label}>{label}</span>}
            <input
                ref={ref}
                className={styles.input}
                type='text'
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </label>
    );
};

export default Field;
