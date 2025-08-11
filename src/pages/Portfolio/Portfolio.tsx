import CloudSection from '@molecules/CloudSection/CloudSection';
import TickerCard from '@organisms/TickerCard/TickerCard';
import PortfolioHeader from '@organisms/PortfolioHeader/PortfolioHeader.tsx';
import styles from '@pages/Portfolio/Portfolio.module.css';
import useSortPortfolio from '@hooks/useSortPortfolio';
import type {PortfolioSortType} from '@models';

const PortfolioPage = () => {
    const {
        currentArray,
        order,
        sort,
        setSort,
        setOrder,
    } = useSortPortfolio();

    const btnSortClick = (value: PortfolioSortType) => {
        if (value === sort) {
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            setOrder(newOrder);

            return;
        }

        setOrder('asc');
        setSort(value);
    };

    let elements;

    if (!currentArray) {
        elements = <p>Data is loading</p>;
    } else if (currentArray.length < 1) {
        elements = <p>Portfolio is empty</p>
    } else {
        const itemElements = currentArray.map(item => {
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

        elements = <div className={styles.inner}>
            <PortfolioHeader
                sort={sort}
                order={order}
                changeSort={btnSortClick}
            />
            {itemElements}
        </div>;
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