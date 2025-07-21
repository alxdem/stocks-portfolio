import StockCard from '@molecules/StockCard/StockCard';
import {useAppSelector} from '@/store/hooks';
import {selectStocksArray} from '@/store/selectors/stocksSelectors';
import styles from '@pages/Stock/Stock.module.css';
import VirtualList from '@organisms/VirtualList/VirtualList';
import {useEffect, useRef, useState} from 'react';
import CloudSection from '@molecules/CloudSection/CloudSection';
import {formatNumber} from '@utils';

const StockPage = () => {
    const stockArray = useAppSelector(selectStocksArray);
    const hiddenCardRef = useRef<HTMLAnchorElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
    const [virtualListHeight, setVirtualListHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        const inner = innerRef.current;
        const hiddenCard = hiddenCardRef.current;

        if (!inner || !hiddenCard) {
            return;
        }

        const heightUpdate = () => {
            setVirtualListHeight(undefined);
            requestAnimationFrame(() => {
                const innerHeight = inner.offsetHeight - 1;
                setVirtualListHeight(innerHeight);
            });
        };

        const cardHeightUpdate = () => {
            setCardHeight(hiddenCard.offsetHeight);
        }

        const cardObserver = new ResizeObserver(cardHeightUpdate);

        heightUpdate();
        cardObserver.observe(hiddenCard);
        window.addEventListener('resize', heightUpdate);

        return () => {
            cardObserver.disconnect();
            window.removeEventListener('resize', heightUpdate);
        }
    }, []);

    return (
        <CloudSection className={styles.main}>
            <div className={styles.header}>
                StockPage
            </div>
            <div ref={innerRef} className={styles.inner}>
                {virtualListHeight &&
                    <VirtualList
                        className={styles.list}
                        height={virtualListHeight}
                        itemHeight={cardHeight}
                        isEnabled={true}
                    >
                        {stockArray.map((item) => (
                            <StockCard
                                key={item.symbol}
                                symbol={item.symbol}
                                name={item.name}
                                price={formatNumber(item.price, false, true)}
                                sector={item.sector}
                            />
                        ))}
                    </VirtualList>
                }
            </div>
            <StockCard
                ref={hiddenCardRef}
                className={styles.cardHidden}
                symbol='Test'
                name='Test'
                price='1000'
                sector='Test'
            />
        </CloudSection>
    );
};

export default StockPage;