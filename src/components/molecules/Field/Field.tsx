import type {FieldProps} from '@molecules/Field/Field.props';
import styles from '@molecules/Field/Field.module.css';
import cn from "classnames";

const Field = ({children, label, error, isErrorActive, as: Tag = 'label', className}: FieldProps) => {
    const classes = cn(
        styles.field,
        isErrorActive && styles.error,
        className,
    );

    return (
        <Tag className={classes}>
            {label && <span className={styles.label}>{label}</span>}
            {children}
            {isErrorActive && <span className={styles.errorText}>{error}</span>}
        </Tag>
    );
};

export default Field;
