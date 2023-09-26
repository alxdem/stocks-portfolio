import { useState, useEffect } from 'react';
import TickerList from '../../components/TickerList/TickerList';
import { IStockShortInfo } from '../../models/common';

import { tikerListData as userTikersData, totalData } from '../../assets/fixtures/dataUser1';
import CloudSection from '../../components/CloudSection/CloudSection';
import IndicatorsPane from '../../components/IndicatorsPane/IndicatorsPane';
import ChartPie from '../../components/ChartPie/ChartPie';
import styles from './Dashboard.module.css';
import { sectorValueCount, typeValueCount } from '../../utils/utils';
import { IChartPieDataItem } from '../../components/ChartPie/ChartPie.props';

const DashboardPage = () => {
    const [tickerData, setTickerData] = useState([]);
    const [tickerExtendData, setTickerExtendData] = useState([]);
    const [pieData, setPieData] = useState<IChartPieDataItem[]>([]);
    const [pieSectorsData, setPieSectorsData] = useState<IChartPieDataItem[]>([]);


    const getTickersListData = async () => {
        const stockListLocal = localStorage.getItem('StockList');
        // TODO: replace fetch urls in separate file

        if (!stockListLocal) {
            try {
                const res = await fetch(`https://fmpcloud.io/api/v3/stock/list?apikey=${import.meta.env.VITE_FMP_KEY}`);
                const data = await res.json();

                const filteredData = data.filter((item: IStockShortInfo) => {
                    return item.exchangeShortName === 'NYSE' || item.exchangeShortName === "NASDAQ";
                });

                console.log('filteredData', filteredData);

                setTickerData(filteredData);
                localStorage.setItem('StockList', JSON.stringify(filteredData));
            } catch (err) {
                console.log('Something went wrong...', err);
            }
        } else {
            setTickerData(JSON.parse(stockListLocal));
        }
    };

    const getTickersListExtendedData = async () => {
        const stockListExtendedLocal = localStorage.getItem('StockListExtended');

        if (!stockListExtendedLocal) {
            try {
                const res = await fetch(`https://fmpcloud.io/api/v3/stock-screener?limit=20000&exchange=NYSE,NASDAQ&apikey=${import.meta.env.VITE_FMP_KEY}`);
                const data = await res.json();

                setTickerExtendData(data);
                if (data) {
                    localStorage.setItem('StockListExtended', JSON.stringify(data));
                }
            } catch (err) {
                console.log('Something went wrong...', err);
            }
        } else {
            setTickerExtendData(JSON.parse(stockListExtendedLocal));
        }
    };

    useEffect(() => {
        getTickersListData();
        getTickersListExtendedData();
    }, []);

    useEffect(() => {
        const countData = typeValueCount(userTikersData, tickerData);
        setPieData(countData);
    }, [tickerData]);

    useEffect(() => {
        const countSectorData = sectorValueCount(userTikersData, tickerExtendData);
        setPieSectorsData(countSectorData);
    }, [tickerExtendData]);


    return (
        <section className={styles.page}>
            <CloudSection className={styles.total}>
                <IndicatorsPane items={totalData} />
            </CloudSection>

            <CloudSection title='Portfolio'>
                <TickerList
                    items={userTikersData}
                    tickerData={tickerData}
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