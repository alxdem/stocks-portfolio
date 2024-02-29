import { useState, useEffect } from 'react';
import TickerList from '../../components/organisms/TickerList/TickerList';
import { ChartPieType } from '../../models/common';
import { tikerListData } from '../../assets/fixtures/dataUser1';
import CloudSection from '../../components/molecules/CloudSection/CloudSection';
import IndicatorsPane from '../../components/molecules/IndicatorsPane/IndicatorsPane';
import ChartPie from '../../components/ChartPie/ChartPie';
import styles from './Dashboard.module.css';
import { chartPieCount, getPercent } from '../../utils/utils';
import { IChartPieDataItem } from '../../components/ChartPie/ChartPie.props';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { IIndicatorTotal } from '../../components/atoms/IndicatorTotal/IndicatorTotal.props';

const DashboardPage = () => {
    const [pieData, setPieData] = useState<IChartPieDataItem[]>([]);
    const [pieSectorsData, setPieSectorsData] = useState<IChartPieDataItem[]>([]);
    const stocksData = useSelector((state: RootState) => state.stocks.stocks);
    const balance = useSelector((state: RootState) => state.user.balance);
    const gain = useSelector((state: RootState) => state.user.gain);
    const cash = useSelector((state: RootState) => state.user.cash);

    useEffect(() => {
        const countData = chartPieCount(tikerListData, stocksData, ChartPieType.Type);
        const countSectorData = chartPieCount(tikerListData, stocksData, ChartPieType.Sector);
        setPieSectorsData(countSectorData);
        setPieData(countData);
    }, [stocksData]);

    const totalData: IIndicatorTotal[] = [
        {
            id: 'balance',
            title: 'Balance',
            value: balance,
        },
        {
            id: 'profit',
            title: 'Profit',
            value: gain,
            percent: getPercent(gain, balance)
        },
        {
            id: 'cash',
            title: 'Cash',
            value: cash,
        }
    ];


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