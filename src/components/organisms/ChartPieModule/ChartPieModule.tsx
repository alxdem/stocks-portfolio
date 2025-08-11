import type {ChartPieModuleProps} from '@organisms/ChartPieModule/ChartPieModule.props';
import styles from '@organisms/ChartPieModule/ChartPieModule.module.css';
import CloudSection from '@molecules/CloudSection/CloudSection';
import ChartPie from '@molecules/ChartPie/ChartPie';
import cn from 'classnames';
import {useState, type CSSProperties} from 'react';
import {formatNumber, getChartColor} from '@utils';

const ChartPieModule = ({data, className}: ChartPieModuleProps) => {
    const [activeShape, setActiveShape] = useState<number | undefined>(undefined);
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    const legendElement = () => {
        return (
            <ul className={styles.legendList}>
                {
                    sortedData.map((item, index) => {
                        const name = item.name;
                        const formatValue = formatNumber(item.value, true, true);
                        const style = {
                            '--bullet-color': getChartColor(index),
                        } as CSSProperties & Record<string, string>;

                        return (
                            <li
                                className={styles.legendItem}
                                key={name}
                                style={style}
                                onMouseEnter={() => setActiveShape(index)}
                            >
                                <span className={styles.legendName}>{name}</span>
                                <span className={styles.legendValues}>{`${formatValue} (${item.percent}%)`}</span>
                            </li>
                        );
                    })
                }
            </ul>
        );
    };

    return (
        <CloudSection className={cn(styles.cloud, className)}>
            <ChartPie
                className={styles.chart}
                data={sortedData}
                activeShapeIndex={activeShape}
                isActiveShape={true}
            />
            {legendElement()}
        </CloudSection>
    );
};

export default ChartPieModule;
