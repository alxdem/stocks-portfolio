import { useState, useEffect } from 'react';
import reactLogo from './../assets/react.svg';
import TickerList from '../components/TickerList/TickerList';
import { IStockShortInfo } from '../models/common';

import { tikerListData, totalData } from '../assets/fixtures/dataUser1';
import CloudSection from '../components/CloudSection/CloudSection';
import IndicatorsPane from '../components/IndicatorsPane/IndicatorsPane';

const DashboardPage = () => {
    const [count, setCount] = useState(0);
    const [tickerData, setTickerData] = useState([]);
    console.log('tikerList', tikerListData);

    const getTickersListData = async () => {
        const stockListLocal = localStorage.getItem('SP-stock-list');

        if (!stockListLocal) {
            try {
                const res = await fetch(`https://fmpcloud.io/api/v3/stock/list?apikey=${import.meta.env.VITE_FMP_KEY}`);
                const data = await res.json();

                const filteredData = data.filter((item: IStockShortInfo) => {
                    return item.exchangeShortName === 'NYSE' || item.exchangeShortName === "NASDAQ";
                });

                setTickerData(filteredData);
                localStorage.setItem('SP-stock-list', JSON.stringify(filteredData));
            } catch (err) {
                console.log('Something went wrong...', err);
            }
        } else {
            setTickerData(JSON.parse(stockListLocal));
        }
    }

    useEffect(() => {
        getTickersListData();
    }, []);

    console.log('totalData', totalData);

    return (
        <>
            <h1>Dashboard Page</h1>
            <CloudSection>
                <IndicatorsPane items={totalData} />
            </CloudSection>

            <CloudSection title='Portfolio'>
                <TickerList
                    items={tikerListData}
                    tickerData={tickerData}
                />
            </CloudSection>


            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </>
    );
};

export default DashboardPage;