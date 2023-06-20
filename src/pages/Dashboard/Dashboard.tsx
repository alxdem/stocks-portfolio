import { useState, useEffect } from 'react';
import reactLogo from './../../assets/react.svg';
import TickerList from '../../components/TickerList/TickerList';
import { IStockShortInfo } from '../../models/common';

import { tikerListData, totalData } from '../../assets/fixtures/dataUser1';
import CloudSection from '../../components/CloudSection/CloudSection';
import IndicatorsPane from '../../components/IndicatorsPane/IndicatorsPane';
import styles from './Dashboard.module.css';

const DashboardPage = () => {
    const [count, setCount] = useState(0);
    const [tickerData, setTickerData] = useState([]);
    console.log('tikerList', tikerListData);

    const getTickersListData = async () => {
        const stockListLocal = localStorage.getItem('StockList');

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
                123
            </CloudSection>


            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </section>
    );
};

export default DashboardPage;