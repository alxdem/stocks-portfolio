import { ResponsivePie } from '@nivo/pie';
import styles from './ChartPie.module.css';
import { IChartPie } from './ChartPie.props';
import { getColor, themeInfo } from '../../utils/theme';

const ChartPie = ({ data }: IChartPie) => {
    if (!data || data.length < 1) {
        return <p>No data to display</p>
    }

    return (
        <div className={styles.main}>
            <div className={styles.chart}>
                <ResponsivePie
                    theme={themeInfo}
                    data={data}
                    margin={{ top: 50, right: 20, bottom: 50, left: 20 }}
                    startAngle={0}
                    innerRadius={0.5}
                    padAngle={1}
                    cornerRadius={3}
                    sortByValue
                    fit={true}
                    activeOuterRadiusOffset={8}
                    arcLinkLabelsSkipAngle={100}
                    arcLinkLabelsTextColor="#3333ee"
                    arcLinkLabelsThickness={1}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    colors={getColor}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 30,
                            itemsSpacing: 0,
                            itemWidth: 70,
                            itemHeight: 18,
                            itemTextColor: 'var(--text)',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 16,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: 'var(--logo)'
                                    }
                                }
                            ]
                        }
                    ]}
                    animate
                />
            </div>
        </div>
    );
}

export default ChartPie;