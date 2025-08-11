import StockCard from '@molecules/StockCard/StockCard';
import styles from '@pages/Stock/Stock.module.css';
import VirtualList from '@organisms/VirtualList/VirtualList';
import {useEffect, useRef, useState} from 'react';
import CloudSection from '@molecules/CloudSection/CloudSection';
import {stockSortButtons, formatNumber, getScrollbarWidth, QUERY_MOBILE} from '@utils';
import type {StockSortType, NumberTuple} from '@models';
import ButtonSort from '@molecules/ButtonSort/ButtonSort';
import useFilterStocks from '@hooks/useFilterStocks';
import FilterStocks from '@organisms/FilterStocks/FilterStocks';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import Button from '@atoms/Button/Button';
import Modal from '@organisms/Modal/Modal';
import cn from 'classnames';
import SpinnerSection from '@molecules/SpinnerSection/SpinnerSection';

const StockPage = () => {
    const ALL_SECTORS_KEY = 'all';

    const isMobile = useAppMediaQuery(QUERY_MOBILE);
    const hiddenCardRef = useRef<HTMLAnchorElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const namesRef = useRef<HTMLDivElement>(null);

    const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
    const [virtualListHeight, setVirtualListHeight] = useState<number | undefined>(undefined);
    const [isMobFilterActive, setIsMobFilterActive] = useState(false);

    const {
        currentArray,
        isLoaded,
        order,
        sort,
        filterSector,
        price,
        minMax,
        setSort,
        setOrder,
        setFilterSector,
        setPrice,
        reset,
    } = useFilterStocks(ALL_SECTORS_KEY);

    const counter = currentArray.length;

    useEffect(() => {
        const inner = innerRef.current;
        const hiddenCard = hiddenCardRef.current;
        const names = namesRef.current;

        if (!inner || !hiddenCard || !names) {
            return;
        }

        const heightUpdate = () => {
            const scrollbarWidth = getScrollbarWidth();
            names.style.paddingRight = `${scrollbarWidth}px`;
            setVirtualListHeight(undefined);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const innerHeight = inner.offsetHeight - 1;
                    setVirtualListHeight(innerHeight);
                });
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

    const btnSortClick = (value: StockSortType) => {
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
        setFilterSector(ALL_SECTORS_KEY);
    };

    const priceChange = (value: number[]) => {
        setPrice([...value] as NumberTuple);
    };

    const isResetBtnDisabled =
        price !== null
        && minMax !== null
        && filterSector === ALL_SECTORS_KEY
        && price[0] === minMax[0]
        && price[1] === minMax[1];

    return (
        <CloudSection className={styles.main}>
            <div className={styles.header}>
                {isMobile &&
                    <div className={cn(
                        styles.mobPanel,
                        !isResetBtnDisabled && styles.withReset,
                    )}>
                        <Button
                            className={styles.mobBtnFilter}
                            as='button'
                            onClick={() => setIsMobFilterActive(true)}
                        >
                            Filter
                        </Button>
                        {!isResetBtnDisabled &&
                            <Button
                                className={styles.reset}
                                theme='secondary'
                                as='button'
                                onClick={reset}
                            >
                                Reset
                            </Button>
                        }
                    </div>
                }
                {!isMobile &&
                    <FilterStocks
                        minMax={minMax}
                        price={price}
                        currentSector={filterSector}
                        isResetDisabled={isResetBtnDisabled}
                        reset={reset}
                        sectorChange={filterSectorChange}
                        sectorClear={filterSectorClear}
                        priceChange={priceChange}
                    />
                }
                <span className={styles.counter}>Found shares: <b>{counter}</b></span>

                <div ref={namesRef} className={styles.names}>
                    {stockSortButtons.map((button, index) => {
                        const isDisabled = button.value === 'sector' && filterSector !== ALL_SECTORS_KEY;

                        return (
                            <ButtonSort
                                key={button.value}
                                text={button.text}
                                isAlignRight={index === stockSortButtons.length - 1}
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
            {virtualListHeight && isLoaded
                ? <VirtualList
                        className={styles.list}
                        height={virtualListHeight}
                        itemHeight={cardHeight}
                        isEnabled={true}
                    >
                        {currentArray.map((item) => (
                            <StockCard
                                key={item.symbol}
                                symbol={item.symbol}
                                name={item.name}
                                price={formatNumber(item.price, false, true)}
                                sector={item.sector}
                            />
                        ))}
                    </VirtualList>
                : <SpinnerSection />
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
            {isMobile &&
                <Modal
                    isOpened={isMobFilterActive}
                    onClose={() => setIsMobFilterActive(false)}
                >
                    <FilterStocks
                        minMax={minMax}
                        price={price}
                        currentSector={filterSector}
                        counter={counter}
                        isResetDisabled={isResetBtnDisabled}
                        isMobile={true}
                        reset={reset}
                        sectorChange={filterSectorChange}
                        sectorClear={filterSectorClear}
                        priceChange={priceChange}
                        btnBackOnClick={() => setIsMobFilterActive(false)}
                    />
                </Modal>
            }
        </CloudSection>
    );
};

export default StockPage;