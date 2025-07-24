import type {FieldProps} from '@molecules/Field/Field.props';
import styles from '@molecules/Field/Field.module.css';
import cn from "classnames";

const Field = ({children, label, error, isErrorActive, className}: FieldProps) => {
    const classes = cn(
        styles.field,
        isErrorActive && styles.error,
        className,
    );

    return (
        <label className={classes}>
            {label && <span className={styles.label}>{label}</span>}
            {children}
            {isErrorActive && <span className={styles.errorText}>{error}</span>}
        </label>
    );
};

export default Field;
