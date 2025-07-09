import type {ChartPieNeedleProps} from '@molecules/ChartPieNeedle/ChartPieNeedle.props';
import styles from '@molecules/ChartPieNeedle/ChartPieNeedle.module.css';
import {ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';
import cn from 'classnames';
import {getNormalizedValue, getChartIndicatorColor} from '@utils';
import NeedleIcon from '@images/needle.svg?react';

const ChartPieNeedle = ({className, data, value, min = 0, max = 100, text}: ChartPieNeedleProps) => {
    const localValue = getNormalizedValue(value, min, max);
    const RATIO = 180;
    const range = max - min;
    const relative = (localValue - min) / range;
    const angle = Math.round(relative * RATIO) + 45;

    return (
        <div className={cn(styles.container, className)}>
            <ResponsiveContainer
                width='100%'
                aspect={2}
            >
                <PieChart>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx='50%'
                        cy='100%'
                        innerRadius='140%'
                        outerRadius='200%'
                        isAnimationActive={false}
                        stroke='none'
                        className={styles.pie}
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={getChartIndicatorColor(index)}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <NeedleIcon style={{transform: `rotate(${angle}deg)`}} className={styles.needle}/>
            <div className={styles.info}>
                <span className={styles.value}>{value}</span>
                {text && <span className={styles.text}>{text}</span>}
            </div>
        </div>
    );
};

export default ChartPieNeedle;
