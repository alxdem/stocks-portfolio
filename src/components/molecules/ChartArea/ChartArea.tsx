import type {ChartAreaProps} from '@molecules/ChartArea/ChartArea.props';
import styles from '@molecules/ChartArea/ChartArea.module.css';
import {AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip, ResponsiveContainer, type TooltipProps} from 'recharts';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import {QUERY_MOBILE} from '@utils';
import useVW from '@hooks/useVW';

const ChartArea = <T extends object, K extends keyof T>({
                                                            data,
                                                            xKey,
                                                            aspect = 3,
                                                            isHorizontalGrid = false,
                                                            isVerticalGrid = false,
                                                            xAxisLabel,
                                                        }: ChartAreaProps<T, K>) => {
    type ValueType = T[K] & (string | number);

    const ASPECT_RATIO = 0.6;
    const yAxisWidthMob = useVW(10);
    const yAxisWidthDesktop = useVW(4);

    const isCartesianGrid = isHorizontalGrid || isVerticalGrid;
    const isMobile = useAppMediaQuery(QUERY_MOBILE);
    const localAspect = isMobile ? Number((aspect * ASPECT_RATIO).toFixed(1)) : aspect;
    const yAxisWidth = isMobile ? yAxisWidthMob : yAxisWidthDesktop;

    const CustomTooltip = ({active, payload, label}: TooltipProps<ValueType, string>) => {
        const isVisible = active && payload && payload.length;
        return (
            <div className={styles.tooltip} style={{visibility: isVisible ? 'visible' : 'hidden'}}>
                {isVisible && (
                    <>
                        <p className={styles.tooltipText}>Date: {label}</p>
                        <p className={styles.tooltipText}>Close: {payload[0].value}</p>
                    </>
                )}
            </div>
        );
    };

    return (
        <ResponsiveContainer
            width='100%'
            aspect={localAspect}
        >
            <AreaChart
                className={styles.chart}
                data={data}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--bg-accent)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--bg-accent)" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis
                    className={styles.xAxis}
                    dataKey={xKey as string}
                    tickLine={false}
                    label={{value: xAxisLabel}}
                    tick={false}
                />
                <YAxis
                    className={styles.yAxis}
                    width={yAxisWidth}
                />
                {isCartesianGrid && <CartesianGrid
                    strokeDasharray='100 0'
                    horizontal={isHorizontalGrid}
                    vertical={isVerticalGrid}
                />}
                <Tooltip
                    offset={15}
                    wrapperClassName={styles.tooltip}
                    cursor={{className: styles.cursor}}
                    content={CustomTooltip}
                />
                <Area
                    type='monotone'
                    dataKey="close"
                    key="date"
                    stroke="var(--button-bg-primary)"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    legendType='line'
                    activeDot={{
                        className: styles.dot,
                        r: 4,
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default ChartArea;
