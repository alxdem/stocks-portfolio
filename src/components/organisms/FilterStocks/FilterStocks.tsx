import type {FilterStocksProps} from '@organisms/FilterStocks/FilterStocks.props';
import styles from '@organisms/FilterStocks/FilterStocks.module.css';
import cn from 'classnames';
import Button from '@atoms/Button/Button';
import type {AppSelectProps} from '@molecules/AppSelect/AppSelect.props';
import AppSelect from '@molecules/AppSelect/AppSelect';
import {useAppSelector} from '@/store/hooks';
import {selectSectorsName} from '@/store/selectors/stocksSelectors';
import RangeDouble from '@molecules/RangeDouble/RangeDouble';

const FilterStocks = ({
                          minMax,
                          price,
                          currentSector,
                          counter,
                          sectorChange,
                          sectorClear,
                          priceChange,
                          className,
                          reset,
                          isResetDisabled,
                          isMobile,
                          btnBackOnClick,
                      }: FilterStocksProps) => {
    const sectorsName = useAppSelector(selectSectorsName);
    const filterSectorOptions = sectorsName.map(sector => ({
        label: sector,
        value: sector,
    }));

    const filterSectorProps: AppSelectProps<string> = {
        label: 'Filter by sector',
        options: [...filterSectorOptions],
        value: currentSector,
        placeholder: 'All sectors',
        isClearable: true,
        onChange: sectorChange,
        onClear: sectorClear,
    };

    const isRangeActive = minMax !== null && price !== null;

    return (
        <div className={cn(styles.filter, className)}>
            {isRangeActive
                ? <RangeDouble
                    label='Price'
                    min={minMax[0]}
                    max={minMax[1]}
                    values={price}
                    onChange={priceChange}
                />
                : <span></span>
            }
            <AppSelect {...filterSectorProps} />
            {isMobile &&
                <Button
                    className={styles.mobBack}
                    theme='primary'
                    as='button'
                    size='medium'
                    onClick={btnBackOnClick}
                >
                    Show {counter} shares
                </Button>
            }
            <Button
                className={styles.reset}
                theme='tertiary'
                as='button'
                size={isMobile ? 'medium' : 'small'}
                disabled={isResetDisabled}
                onClick={reset}
            >
                Reset
            </Button>
        </div>
    );
};

export default FilterStocks;
