import type {CounterProps} from '@molecules/Counter/Counter.props';
import styles from '@molecules/Counter/Counter.module.css';
import Field from '@atoms/Field/Field';
import Button from '@atoms/Button/Button';
import PlusIcon from '@images/plus.svg?react';
import MinusIcon from '@images/minus.svg?react';

const Counter = ({
                     increase,
                     reduce,
                     label,
                     placeholder,
                     value,
                     disabled,
                     min = 0,
                     max = 9999,
                     onChange,
                 }: CounterProps) => {
    return (
        <div className={styles.counter}>
            <Button
                as='button'
                shape='square'
                theme='tertiary'
                className={styles.button}
                disabled={disabled || value <= min}
                onClick={reduce}
            >
                <MinusIcon/>
            </Button>
            <Field
                label={label}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                isCentred
            />
            <Button
                as='button'
                shape='square'
                theme='tertiary'
                className={styles.button}
                disabled={disabled || value >= max}
                onClick={increase}
            >
                <PlusIcon/>
            </Button>
        </div>
    );
};

export default Counter;
