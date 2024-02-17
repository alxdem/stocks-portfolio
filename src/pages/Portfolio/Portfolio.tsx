import CloudSection from '../../components/CloudSection/CloudSection';
import styles from './Portfolio.module.css';
import TickerExtendedList from '../../components/TickerExtendedList/TickerExtendedList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PortfolioPage = () => {
    const stocksData = useSelector((state: RootState) => state.stocks.stocks);
    const portfolio = useSelector((state: RootState) => state.user.portfolio);

    return (
        <section className={styles.page}>
            <CloudSection className={styles.total}>
                <TickerExtendedList
                    items={portfolio}
                    stocksData={stocksData}
                />
            </CloudSection>
        </section>
    );
};

export default PortfolioPage;