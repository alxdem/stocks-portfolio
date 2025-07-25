import StockCard from '@molecules/StockCard/StockCard';
import {useAppSelector} from '@/store/hooks';
import {selectStocksArray, selectSectorsName} from '@/store/selectors/stocksSelectors';
import styles from '@pages/Stock/Stock.module.css';
import VirtualList from '@organisms/VirtualList/VirtualList';
import {useEffect, useRef, useState, useMemo} from 'react';
import CloudSection from '@molecules/CloudSection/CloudSection';
import {formatNumber, getScrollbarWidth} from '@utils';
import type {SortOrder} from '@models';
import ButtonSort from '@molecules/ButtonSort/ButtonSort';
import AppSelect from '@molecules/AppSelect/AppSelect';
import type {AppSelectProps} from '@molecules/AppSelect/AppSelect.props';

const sortButtons = [
    {text: 'Company', value: 'symbol'},
    {text: 'Sector', value: 'sector'},
    {text: 'Price', value: 'price'},
] as const;

type SortType = typeof sortButtons[number]['value'];

const StockPage = () => {
    const stockArray = useAppSelector(selectStocksArray);
    const sectorsName = useAppSelector(selectSectorsName);
    const hiddenCardRef = useRef<HTMLAnchorElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const innerNames = useRef<HTMLDivElement>(null);

    const filterSectorOptions = sectorsName.map(sector => ({
        label: sector,
        value: sector,
    }));

    const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
    const [virtualListHeight, setVirtualListHeight] = useState<number | undefined>(undefined);

    const [sort, setSort] = useState<SortType>('symbol');
    const [order, setOrder] = useState<SortOrder>('asc');
    const [filterSector, setFilterSector] = useState<string>('all');

    const formattedStockArray = useMemo(() => {
        const tickerArray = [...stockArray];
        const filteredArray = filterSector !== 'all'
            ? tickerArray.filter(item => item.sector === filterSector)
            : null;

        const currentArray = filteredArray ? filteredArray : tickerArray;

        return currentArray.sort((a, b) => {
            const keyA = a[sort];
            const keyB = b[sort];

            if (typeof keyA === 'string' && typeof keyB === 'string') {
                return order === 'asc'
                    ? keyA.localeCompare(keyB, 'en')
                    : keyB.localeCompare(keyA, 'en');
            }

            if (typeof keyA === 'number' && typeof keyB === 'number') {
                return order === 'asc' ? keyA - keyB : keyB - keyA;
            }

            return 0;
        });
    }, [stockArray, sort, order, filterSector]);

    useEffect(() => {
        const inner = innerRef.current;
        const hiddenCard = hiddenCardRef.current;
        const names = innerNames.current;

        if (!inner || !hiddenCard || !names) {
            return;
        }

        const heightUpdate = () => {
            const scrollbarWidth = getScrollbarWidth();
            names.style.paddingRight = `${scrollbarWidth}px`;
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

    const btnSortClick = (value: SortType) => {
        if (value === sort) {
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            setOrder(newOrder);

            return;
        }

        setOrder('asc');
        setSort(value);
    };

    const filterSectorChange = (value: string) => {
        setFilterSector(value);
    };

    const filterSectorClear = () => {
        setFilterSector('all');
    };

    const filterSectorProps: AppSelectProps<string> = {
        label: 'Filter by sector',
        options: [...filterSectorOptions],
        value: filterSector,
        placeholder: 'All sectors',
        isClearable: true,
        onChange: filterSectorChange,
        onClear: filterSectorClear,
    };

    return (
        <CloudSection className={styles.main}>
            <div className={styles.header}>
                <AppSelect {...filterSectorProps} />
                <div ref={innerNames} className={styles.names}>
                    {sortButtons.map((button, index) => {
                        const isDisabled = button.value === 'sector' && filterSector !== 'all';

                        return (
                            <ButtonSort
                                key={button.value}
                                text={button.text}
                                isAlignRight={index === sortButtons.length - 1}
                                isActive={button.value === sort}
                                order={order}
                                disabled={isDisabled}
                                className={index === 1 ? styles.btnSector : undefined}
                                onClick={() => btnSortClick(button.value)}
                            />
                        )
                    })}
                </div>
            </div>
            <div ref={innerRef} className={styles.inner}>
                {virtualListHeight &&
                    <VirtualList
                        className={styles.list}
                        height={virtualListHeight}
                        itemHeight={cardHeight}
                        isEnabled={true}
                    >
                        {formattedStockArray.map((item) => (
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