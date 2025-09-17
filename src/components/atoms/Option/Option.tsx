import type {OptionProps} from '@atoms/Option/Option.props';
import styles from '@atoms/Option/Option.module.css';
import cn from 'classnames';

const Option = ({
                    text,
                    value,
                    checked,
                    name,
                    disabled,
                    required,
                    className,
                    view = 'standard',
                    type = 'checkbox',
                    onChange,
                }: OptionProps) => {
    const classes = cn(
        styles.option,
        checked && styles.checked,
        styles[view],
        className,
    );

    return (
        <label className={classes}>
            <input
                className={styles.input}
                type={type}
                value={value}
                name={name}
                checked={checked}
                disabled={disabled}
                required={required}
                onChange={onChange}
            />
            {text && <span className={styles.text}>{text}</span>}
        </label>
    );
};

export default Option;
