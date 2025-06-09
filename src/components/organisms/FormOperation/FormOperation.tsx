import type {FormOperationProps} from '@organisms/FormOperation/FormOperation.props';
import styles from '@organisms/FormOperation/FormOperation.module.css';
import Button from '@atoms/Button/Button';
import Counter from '@molecules/Counter/Counter';
import useCalculateOperation from '@hooks/useCalculateOperation';
import type {ChangeEventHandler, FormEvent} from 'react';
import {isStringNumber} from '@/utils';
import useAddOperation from '@hooks/useAddOperation';
import cn from 'classnames';

const FormOperation = ({price, maxSteps, symbol, type, onSubmit}: FormOperationProps) => {
    const {isLoading, addOperation} = useAddOperation();
    const {value, total, reduce, increase, setValue} = useCalculateOperation(price);

    const btnText = type === 'sale' ? 'Sell' : 'Buy';

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const localValue = e.target.value;
        const isValueTrue = isStringNumber(localValue) && Number(localValue) <= maxSteps;
        if (isValueTrue) {
            setValue(Number(localValue));
        }
    };

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await addOperation({
            date: Date.now(),
            symbol,
            price,
            value,
            type: type,
        });

        if (onSubmit) {
            onSubmit(e);
        }
    };

    const classes = cn(
        styles.form,
        isLoading && styles.loading,
    );

    return (
        <form
            className={classes}
            onSubmit={submit}
        >
            <p className={styles.text}>Price: <span>${price}</span></p>
            <Counter
                value={value}
                max={maxSteps}
                reduce={reduce}
                increase={increase}
                onChange={onChange}
            />
            <p className={styles.text}>Total: <span>${total}</span></p>
            <Button
                className={styles.button}
                as='button'
                size='large'
                disabled={value < 1}
            >
                {btnText}
            </Button>
        </form>
    );
};

export default FormOperation;