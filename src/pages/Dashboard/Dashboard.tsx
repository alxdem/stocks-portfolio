import { useState, useEffect } from 'react';
import TickerList from '../../components/TickerList/TickerList';
import { ChartPieType } from '../../models/common';
import { tikerListData, totalData } from '../../assets/fixtures/dataUser1';
import CloudSection from '../../components/CloudSection/CloudSection';
import IndicatorsPane from '../../components/IndicatorsPane/IndicatorsPane';
import ChartPie from '../../components/ChartPie/ChartPie';
import styles from './Dashboard.module.css';
import { chartPieCount } from '../../utils/utils';
import { IChartPieDataItem } from '../../components/ChartPie/ChartPie.props';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
    const [pieData, setPieData] = useState<IChartPieDataItem[]>([]);
    const [pieSectorsData, setPieSectorsData] = useState<IChartPieDataItem[]>([]);
    const stocksData = useSelector((state: RootState) => state.stocks.stocks);

    useEffect(() => {
        const countData = chartPieCount(tikerListData, stocksData, ChartPieType.Type);
        const countSectorData = chartPieCount(tikerListData, stocksData, ChartPieType.Sector);
        setPieSectorsData(countSectorData);
        setPieData(countData);
    }, [stocksData]);


    return (
        <section className={styles.page}>
            <CloudSection className={styles.total}>
                <IndicatorsPane items={totalData} />
            </CloudSection>

            <CloudSection title='Portfolio'>
                <TickerList
                    items={tikerListData}
                    stocksData={stocksData}
                    amount={6}
                />
            </CloudSection>

            <CloudSection title='Portfolio'>
                <ChartPie data={pieData} />
            </CloudSection>

            <CloudSection title='Sectors'>
                <ChartPie data={pieSectorsData} />
            </CloudSection>
        </section>
    );
};

export default DashboardPage;