import type {ChartAreaModuleProps} from '@organisms/ChartAreaModule/ChartAreaModule.props';
import styles from '@organisms/ChartAreaModule/ChartAreaModule.module.css';
import ChartArea from '@molecules/ChartArea/ChartArea';
import useTickerHistoryPrices from '@hooks/useTickerHistoryPrices';
import SpinnerSection from '@molecules/SpinnerSection/SpinnerSection';
import CloudSection from '@molecules/CloudSection/CloudSection';
import {chartPeriods} from '@utils';
import Option from '@atoms/Option/Option';
import cn from 'classnames';

const ChartAreaModule = ({ticker, xAxisLabel, className}: ChartAreaModuleProps) => {
    const {
        period,
        setPeriod,
        historyPrices,
        isLoading
    } = useTickerHistoryPrices(ticker);

    return (
        <CloudSection className={cn(styles.main, className)}>
            {isLoading && <SpinnerSection className={styles.spinner}/>}
            {!isLoading && !historyPrices && (
                <p>We were unable to load the data.</p>
            )}
            {!isLoading && historyPrices && historyPrices.length < 1 && (
                <p>No data for this ticker.</p>
            )}
            {historyPrices && historyPrices.length >= 1 && (
                <>
                    <div className={styles.header}>
                        {chartPeriods.map(item => (
                            <Option
                                key={item}
                                type='radio'
                                text={item}
                                value={item}
                                name='period'
                                view='badge'
                                className={styles.button}
                                checked={item === period}
                                onChange={() => setPeriod(item)}
                            />
                        ))}
                    </div>
                    <ChartArea
                        data={historyPrices}
                        xKey='date'
                        yKey='close'
                        xAxisLabel={xAxisLabel}
                        isHorizontalGrid
                    />
                </>
            )}
        </CloudSection>
    );
};

export default ChartAreaModule;
