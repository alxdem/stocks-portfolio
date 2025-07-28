import type {RangeDoubleProps} from '@molecules/RangeDouble/RangeDouble.props';
import styles from '@molecules/RangeDouble/RangeDouble.module.css';
import Field from '@molecules/Field/Field';
import AppRange from '@atoms/AppRange/AppRange';
import {useEffect, useState} from 'react';
import {getNormalizedValue} from '@utils';
import Input from '@molecules/Input/Input';
import type {NumberTuple} from '@models';
import cn from 'classnames';

const RangeDouble = ({
                         className,
                         values,
                         label,
                         step = 1,
                         min = 0,
                         max = 100,
                         onChange
                     }: RangeDoubleProps) => {
    const [localValues, setLocalValues] = useState<NumberTuple>([50, 80]);

    useEffect(() => {
        const normalizedValues: NumberTuple = [
            getNormalizedValue(values[0], min, max),
            getNormalizedValue(values[1], min, max),
        ];
        setLocalValues(normalizedValues);
    }, [values]);

    const localChange = (value: number[]) => {
        onChange?.([value[0], value[1]]);
    };

    const inputValueChange = (value: string, type: 'min' | 'max') => {
        const valueNumber = value ? Number(value) : NaN;

        if (Number.isNaN(valueNumber)) {
            return;
        }

        const normalizedValue = getNormalizedValue(valueNumber, min, max);

        if (type === 'min') {
            localChange([normalizedValue, localValues[1]]);
        } else {
            localChange([localValues[0], normalizedValue]);
        }
    };

    return (
        <Field
            as='div'
            className={className}
            label={label}
        >
            <div className={styles.inner}>
                <Input
                    name='priceMin'
                    className={styles.input}
                    maskOptions={{
                        mask: Number,
                    }}
                    value={localValues[0]}
                    onCustomBlur={value => inputValueChange(value, 'min')}
                />
                <Input
                    name='priceMax'
                    className={cn(styles.input, styles.max)}
                    maskOptions={{
                        mask: Number,
                    }}
                    value={localValues[1]}
                    onCustomBlur={value => inputValueChange(value, 'max')}
                />
                <AppRange
                    className={styles.range}
                    step={step}
                    min={min}
                    max={max}
                    values={localValues}
                    onChange={localChange}
                />
            </div>
        </Field>
    );
};

export default RangeDouble;
