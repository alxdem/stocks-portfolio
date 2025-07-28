import type {AppRangeProps, RenderMarkParams} from '@atoms/AppRange/AppRange.props';
import styles from '@atoms/AppRange/AppRange.module.css';
import cn from 'classnames';
import {Range} from 'react-range';
import {useEffect, useState} from 'react';
import {getNormalizedValue} from '@utils';

const AppRange = ({
                      className,
                      values,
                      step = 1,
                      min = 0,
                      max = 100,
                      isMarks,
                      markStep = 50,
                      onChange,
                  }: AppRangeProps) => {
    const [localValues, setLocalValues] = useState([50, 80]);

    const classes = cn(
        styles.field,
        isMarks && styles.isMark,
        className,
    );

    const onFinalChange = (values: number[]) => {
        onChange?.(values);
    };

    useEffect(() => {
        const normalizedValues = values.map(value => getNormalizedValue(value, min, max));
        setLocalValues(normalizedValues);
    }, [values]);

    const renderMark = isMarks
        ? ({props, index}: RenderMarkParams) => {
            if (index % markStep !== 0) {
                return null;
            }

            return (
                <div
                    {...props}
                    key={props.key}
                    className={styles.mark}
                    style={{
                        ...props.style,
                    }}
                >
                    {index}
                </div>
            )
        }
        : undefined;

    return (
        <div className={classes}>
            <Range
                step={step}
                min={min}
                max={max}
                values={localValues}
                onChange={(values) => setLocalValues(values)}
                onFinalChange={onFinalChange}
                renderTrack={({props, children}) => (
                    <div
                        {...props}
                        className={styles.track}
                        style={{
                            ...props.style,
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({index, props}) => (
                    <div
                        {...props}
                        key={props.key}
                        className={styles.thumb}
                        style={{
                            ...props.style,
                        }}
                    >
                        <div className={styles.thumbValue}>
                            {localValues[index].toFixed()}
                        </div>
                    </div>
                )}
                renderMark={renderMark}
            />
        </div>
    );
};

export default AppRange;
