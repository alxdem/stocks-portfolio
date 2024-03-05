import { useState, useEffect } from 'react';
import { tikerListData } from '@assets/fixtures/dataUser1';
import styles from '@pages/Dashboard/Dashboard.module.css';
import { useSelector } from 'react-redux';
import { chartPieCount, getPercent } from '@utils/utils';
import CloudSection from '@molecules/CloudSection/CloudSection';
import IndicatorsPane from '@molecules/IndicatorsPane/IndicatorsPane';
import TickerList from '@organisms/TickerList/TickerList';
import { RootState } from '@store/index';
import { IIndicatorTotal } from '@atoms/IndicatorTotal/IndicatorTotal.props';
import { ChartPieType } from '@models/common';

import { IChartPieDataItem } from '../../components/ChartPie/ChartPie.props';
import ChartPie from '../../components/ChartPie/ChartPie';


const DashboardPage = () => {
    const PORTFOLIO_AMOUNT_VISIBLE = 6;

    const [pieData, setPieData] = useState<IChartPieDataItem[]>([]);
    const [pieSectorsData, setPieSectorsData] = useState<IChartPieDataItem[]>([]);
    const stocksData = useSelector((state: RootState) => state.stocks.stocks);
    const balance = useSelector((state: RootState) => state.user.balance);
    const gain = useSelector((state: RootState) => state.user.gain);
    const cash = useSelector((state: RootState) => state.user.cash);
    const portfolio = useSelector((state: RootState) => state.user.portfolio);

    useEffect(() => {
        const countData = chartPieCount(tikerListData, stocksData, ChartPieType.Type);
        const countSectorData = chartPieCount(tikerListData, stocksData, ChartPieType.Sector);
        setPieSectorsData(countSectorData);
        setPieData(countData);
    }, [stocksData]);

    const portfolioDecrease = [...portfolio]
        .sort((a, b) => (b.totalPrice - a.totalPrice))
        .slice(0, PORTFOLIO_AMOUNT_VISIBLE);

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
                <TickerList items={portfolioDecrease} />
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