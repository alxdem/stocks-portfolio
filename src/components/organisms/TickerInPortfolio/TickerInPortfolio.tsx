import type {TickerInPortfolioProps} from '@organisms/TickerInPortfolio/TickerInPortfolio.props';
import styles from '@organisms/TickerInPortfolio/TickerInPortfolio.module.css';
import ChartPie from '@molecules/ChartPie/ChartPie';
import {useAppSelector} from '@/store/hooks';
import {selectMarketValue, selectPortfolio} from '@/store/selectors/userSelectors';
import type {StockPosition, Nullable} from '@models';
import {getSinglePercentChartPie, formatNumber, getChange} from '@utils';
import cn from 'classnames';
import CloudSection from '@molecules/CloudSection/CloudSection';
import BadgeGain from '@molecules/BadgeGain/BadgeGain';

const TickerInPortfolio = ({symbol = '', price = 0, className}: TickerInPortfolioProps) => {
    const marketValue = useAppSelector(selectMarketValue);
    const portfolio = useAppSelector(selectPortfolio);
    const tickerPortfolioInfo: Nullable<StockPosition> = portfolio?.find(item => item.symbol === symbol) || null;
    const {value, gain, gainPercent = 0, averagePrice } = tickerPortfolioInfo || {};

    if (price === 0 || !value || !averagePrice) {
        return null;
    }

    const {changeValue, sign} = getChange(gain || 0);

    const tickerValue = value * price;
    const tickerPercent = (tickerValue * 100 / marketValue).toFixed(2);
    const pieData = getSinglePercentChartPie(tickerValue, marketValue);

    const gainClasses = cn(
        styles.gain,
        sign === '-' && styles.fall,
        sign === '+' && styles.rise,
    );

    return (
        <CloudSection className={cn(styles.main, className)}>
            <div className={styles.info}>
                <ChartPie
                    className={styles.chart}
                    data={pieData}
                    activeShapeIndex={undefined}
                />
                <p className={styles.text}><b>{tickerPercent}%</b> of your portfolios</p>
                <span className={styles.value}>{formatNumber(tickerValue, false, true)}</span>
                <span className={styles.shares}>{value} shares</span>
            </div>
            <div className={styles.inner}>
                <span>Average price: <b>{formatNumber(averagePrice, false, true)}</b></span>
                <div className={gainClasses}>
                    <span>Total gain</span>
                    <span className={styles.gainValue}>{sign}${changeValue}</span>
                    <BadgeGain
                        className={styles.gainPercent}
                        value={gainPercent}
                        text={`${gainPercent.toFixed(2)}%`}
                    />
                </div>
            </div>
        </CloudSection>
    );
};

export default TickerInPortfolio;
