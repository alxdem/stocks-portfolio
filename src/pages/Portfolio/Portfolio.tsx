import CloudSection from '@molecules/CloudSection/CloudSection';
import {useAppSelector} from '@/store/hooks';
import TickerCard from '@organisms/TickerCard/TickerCard';
import TickerList from '@organisms/TickerList/TickerList';
import styles from '@pages/Portfolio/Portfolio.module.css';

const PortfolioPage = () => {
    const portfolio = useAppSelector(state => state.user.formattedPortfolio);

    let elements;

    if (!portfolio) {
        elements = <p>Data is loading</p>;
    } else if (portfolio.length < 1) {
        elements = <p>Portfolio is empty</p>
    } else {
        const itemElements = portfolio.map(item => {
            return (
                <TickerCard
                    key={item.symbol}
                    to={`/stocks/${item.symbol}`}
                    symbol={item.symbol}
                    name={item.name}
                    value={item.value}
                    price={item.price}
                    averagePrice={item.averagePrice}
                    gain={item.gain}
                    gainPercent={item.gainPercent}
                    totalPrice={item.totalPrice}
                    isLoss={item.isLoss}
                />
            );
        });

        elements = <TickerList className={styles.list}>
            {itemElements}
        </TickerList>;
    }

    return (
        <section>
            <CloudSection>
                {elements}
            </CloudSection>
        </section>
    );
};

export default PortfolioPage;