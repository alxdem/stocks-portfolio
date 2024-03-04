import { RootState } from '@store/index';
import styles from '@pages/Portfolio/Portfolio.module.css';
import { useSelector } from 'react-redux';
import CloudSection from '@molecules/CloudSection/CloudSection';
import TickerExtendedList from '@organisms/TickerExtendedList/TickerExtendedList';

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