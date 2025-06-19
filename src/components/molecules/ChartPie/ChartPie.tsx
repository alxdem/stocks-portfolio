import type {OnMouseEnter, RenderActiveShape, ActiveShape} from '@molecules/ChartPie/ChartPie.props';
import styles from '@molecules/ChartPie/ChartPie.module.css';
import {Cell, Pie, PieChart, ResponsiveContainer, Sector} from 'recharts';
import {useState, useRef, useEffect} from 'react';
import cn from 'classnames';
import type {ChartPieProps} from '@models';
import {formatNumber, getChartColor} from '@/utils';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import {QUERY_MOBILE, QUERY_TABLET, QUERY_DESKTOP_SM} from '@utils/variables';

const ChartPie = ({data, activeShapeIndex, className}: ChartPieProps) => {
    const [activeShape, setActiveShape] = useState<number | undefined>(undefined);
    const timerId = useRef<number | undefined>(undefined);
    const isMobile = useAppMediaQuery(QUERY_MOBILE);
    const isTablet = useAppMediaQuery(QUERY_TABLET);
    const isDesktopSm = useAppMediaQuery(QUERY_DESKTOP_SM);

    const gap = isMobile ? 6.2
        : isTablet ? 2.3
        : (isDesktopSm ? 1.4 : 1.2);

    const onMouseEnter: OnMouseEnter = (_props, index) => {
        clearTimeout(timerId.current);
        setActiveShape(index);
    };

    const onMouseLeave = () => {
        timerId.current = setTimeout(() => {
            setActiveShape(undefined);
        }, 800);
    };

    useEffect(() => {
        if (activeShapeIndex) {
            onMouseEnter({}, activeShapeIndex);
        } else {
            onMouseLeave();
        }
    }, [activeShapeIndex]);

    const renderActiveShape: RenderActiveShape = (props) => {
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            name,
            percent,
            value,
        } = props as ActiveShape;
        const formatValue = formatNumber(value, true, true);

        return (
            <g>
                <circle cx={cx} cy={cy} r={innerRadius - 3} fill={fill} stroke="none" className={styles.circle}/>
                <text x={cx} y={cy} textAnchor="middle">
                    <tspan className={styles.name} x={cx} dy='0'>{name}</tspan>
                    <tspan className={styles.percent} x={cx} dy={`${gap}vw`}>{`${percent}%`}</tspan>
                    <tspan className={styles.value} x={cx} dy={`${gap}vw`}>{`${formatValue}`}</tspan>
                </text>
                <Sector
                    className={styles.sector}
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    return (
        <ResponsiveContainer
            className={cn(styles.container, className)}
            width='100%'
            aspect={1}
        >
            <PieChart
                className={styles.pieChart}
            >
                <Pie
                    className={styles.pie}
                    data={data}
                    dataKey='value'
                    cx='50%'
                    cy='50%'
                    innerRadius='70%'
                    outerRadius='100%'
                    startAngle={0}
                    endAngle={360}
                    minAngle={0}
                    paddingAngle={1}
                    isAnimationActive={true}
                    animationBegin={500}
                    animationDuration={1500}
                    animationEasing='ease'
                    stroke='none'
                    activeIndex={activeShape}
                    activeShape={renderActiveShape}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {data?.map((item, index) => (
                        <Cell className={styles.cell} key={`cell-${item.name}`} fill={getChartColor(index)}/>
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ChartPie;
