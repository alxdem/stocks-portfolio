import { useState, useEffect } from 'react';
import reactLogo from './../../assets/react.svg';
import TickerList from '../../components/TickerList/TickerList';
import { IStockShortInfo } from '../../models/common';

import { tikerListData, totalData } from '../../assets/fixtures/dataUser1';
import CloudSection from '../../components/CloudSection/CloudSection';
import IndicatorsPane from '../../components/IndicatorsPane/IndicatorsPane';
import ChartPie from '../../components/ChartPie/ChartPie';
import styles from './Dashboard.module.css';
import { typeValueCount } from '../../utils/utils';
import { IChartPieDataItem } from '../../components/ChartPie/ChartPie.props';

const DashboardPage = () => {
    const [tickerData, setTickerData] = useState([]);
    const [pieData, setPieData] = useState<IChartPieDataItem[]>([]);

    const getTickersListData = async () => {
        const stockListLocal = localStorage.getItem('StockList');

        if (!stockListLocal) {
            try {
                const res = await fetch(`https://fmpcloud.io/api/v3/stock/list?apikey=${import.meta.env.VITE_FMP_KEY}`);
                const data = await res.json();

                const filteredData = data.filter((item: IStockShortInfo) => {
                    return item.exchangeShortName === 'NYSE' || item.exchangeShortName === "NASDAQ";
                });

                // console.log('filteredData', filteredData);

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

        try {
            const res = await fetch(`https://fmpcloud.io/api/v3/stock-screener?limit=20000&exchange=NYSE,NASDAQ&apikey=${import.meta.env.VITE_FMP_KEY}`);
            const data = await res.json();

            console.log('data', data);
        } catch (err) {
            console.log('Something went wrong...', err);
        }
    };

    useEffect(() => {
        getTickersListData();
        // getTickersListExtendedData();
    }, []);

    useEffect(() => {
        const y = typeValueCount(tikerListData, tickerData);
        setPieData(y);
        console.log('pieData', pieData);
    }, [tikerListData, tickerData]);

    console.log('tikerListData', tikerListData);
    console.log('tickerData', tickerData);





    return (
        <section className={styles.page}>
            <CloudSection className={styles.total}>
                <IndicatorsPane items={totalData} />
            </CloudSection>

            <CloudSection title='Portfolio'>
                <TickerList
                    items={tikerListData}
                    tickerData={tickerData}
                />
            </CloudSection>

            <CloudSection title='Portfolio'>
                <ChartPie data={pieData} />
            </CloudSection>
        </section>
    );
};

export default DashboardPage;