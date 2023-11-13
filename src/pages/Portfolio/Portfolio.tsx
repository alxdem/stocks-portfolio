import CloudSection from '../../components/CloudSection/CloudSection';
import styles from './Portfolio.module.css';
import TickerExtendedList from '../../components/TickerExtendedList/TickerExtendedList';
import { tikerListData } from '../../assets/fixtures/dataUser1';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PortfolioPage = () => {
    const stocksData = useSelector((state: RootState) => state.stocks.stocks);

    return (
        <section className={styles.page}>
            <CloudSection className={styles.total}>
                <TickerExtendedList
                    items={tikerListData}
                    tickerData={stocksData}
                />
            </CloudSection>
        </section>
    );
};

export default PortfolioPage;