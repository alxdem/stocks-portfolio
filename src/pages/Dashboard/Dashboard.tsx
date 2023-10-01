import { useState, useEffect } from 'react';
import TickerList from '../../components/TickerList/TickerList';
import { IStockShortInfo, ChartPieType } from '../../models/common';

import { tikerListData as userTikersData, totalData } from '../../assets/fixtures/dataUser1';
import CloudSection from '../../components/CloudSection/CloudSection';
import IndicatorsPane from '../../components/IndicatorsPane/IndicatorsPane';
import ChartPie from '../../components/ChartPie/ChartPie';
import styles from './Dashboard.module.css';
import { chartPieCount } from '../../utils/utils';
import { IChartPieDataItem } from '../../components/ChartPie/ChartPie.props';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { setStocks, setStocksExtend } from '../../reducers/stocksSlice';

const DashboardPage = () => {
    const [pieData, setPieData] = useState<IChartPieDataItem[]>([]);
    const [pieSectorsData, setPieSectorsData] = useState<IChartPieDataItem[]>([]);

    const stocksData = useSelector((state: RootState) => state.stocks.stocks);
    const stocksExtendData = useSelector((state: RootState) => state.stocks.stocksExtend);
    const dispatch = useDispatch();

    const getTickersListData = async () => {
        // TODO: replace fetch urls in separate file

        if (!stocksData.length) {
            try {
                const res = await fetch(`https://fmpcloud.io/api/v3/stock/list?apikey=${import.meta.env.VITE_FMP_KEY}`);
                const data = await res.json();

                const filteredData = data.filter((item: IStockShortInfo) => {
                    return item.exchangeShortName === 'NYSE' || item.exchangeShortName === "NASDAQ";
                });

                dispatch(setStocks(filteredData));
            } catch (err) {
                console.log('Something went wrong...', err);
            }
        }
    };

    const getTickersListExtendedData = async () => {
        if (!stocksExtendData.length) {
            try {
                const res = await fetch(`https://fmpcloud.io/api/v3/stock-screener?limit=20000&exchange=NYSE,NASDAQ&apikey=${import.meta.env.VITE_FMP_KEY}`);
                const data = await res.json();

                dispatch(setStocksExtend(data));
            } catch (err) {
                console.log('Something went wrong...', err);
            }
        }
    };

    useEffect(() => {
        getTickersListData();
        getTickersListExtendedData();
    }, []);

    useEffect(() => {
        const countData = chartPieCount(userTikersData, stocksData, ChartPieType.Type);
        setPieData(countData);
    }, [stocksData]);

    useEffect(() => {
        const countSectorData = chartPieCount(userTikersData, stocksExtendData, ChartPieType.Sector);
        setPieSectorsData(countSectorData);
    }, [stocksExtendData]);


    return (
        <section className={styles.page}>
            <CloudSection className={styles.total}>
                <IndicatorsPane items={totalData} />
            </CloudSection>

            <CloudSection title='Portfolio'>
                <TickerList
                    items={userTikersData}
                    tickerData={stocksData}
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