import TickerHeader from '@organisms/TickerHeader/TickerHeader';
import CloudSection from '@molecules/CloudSection/CloudSection';
import styles from '@pages/Stock/Ticker/Ticker.module.css';
import typographyStyles from '@/styles/typography.module.css';
import TickerActions from '@organisms/TickerActions/TickerActions';
import useTickerInfo from '@hooks/useTickerInfo';
import CompanyContacts from '@molecules/CompanyContacts/CompanyContacts';
import TickerInPortfolio from '@organisms/TickerInPortfolio/TickerInPortfolio';
import {useParams, useNavigate} from 'react-router';
import {useAppSelector} from '@/store/hooks';
import {selectDividendsInfo, selectSectors, selectBetaInfo} from '@/store/selectors/stocksSelectors';
import ChartRange from '@molecules/ChartRange/ChartRange';
import IndicatorSection from '@molecules/IndicatorSection/IndicatorSection';
import type {MinAvgMax, TabItem} from '@models';
import {useEffect} from 'react';
import TickerOperations from '@organisms/TickerOperations/TickerOperations';
import Tabs from '@organisms/Tabs/Tabs';
import SpinnerSection from '@molecules/SpinnerSection/SpinnerSection';
import {
    formatNumber,
    formatHugeNumber,
    getAddressString,
    getAnnualRange,
    BETA_MAX,
    MIN_AVG_MAX_DEFAULT_VALUE,
    GOOGLE_SEARCH_URL,
} from '@utils';
import ChartAreaModule from '@organisms/ChartAreaModule/ChartAreaModule';

const TickerPage = () => {
    const navigate = useNavigate();
    const {ticker} = useParams();
    const {info, isLoading} = useTickerInfo(ticker || '');
    const dividends = useAppSelector(selectDividendsInfo);
    const betas = useAppSelector(selectBetaInfo);
    const sectors = useAppSelector(selectSectors);

    useEffect(() => {
        if (!isLoading && !info) {
            navigate('/');
        }
    }, [info, isLoading]);

    if (isLoading) {
        return <SpinnerSection />;
    }

    if (!info || !ticker) {
        return null;
    }

    const {
        companyName,
        price,
        sector,
        industry,
        beta,
        description,
        city,
        country,
        fullTimeEmployees = '',
        ipoDate,
        range = '',
        marketCap,
        lastDividend,
        change,
        changePercentage,
        phone,
        volume,
        averageVolume,
        website,
        ceo,
        cik,
        isin,
        cusip,
        exchangeFullName,
        address,
        state,
        zip,
    } = info || {};

    const title = `${companyName} (${ticker})`;
    const priceLocal = price ? `${formatNumber(price, false, true)}` : '';
    const isValuesCorrect = typeof lastDividend === 'number' && typeof price === 'number';
    const dividendsPercent = isValuesCorrect ? lastDividend * 100 / price : null;
    const dividendsCurrentSector: MinAvgMax = sectors && sector ? sectors[sector].dividends : MIN_AVG_MAX_DEFAULT_VALUE;
    const betasCurrentSector: MinAvgMax = sectors && sector ? sectors[sector].betas : MIN_AVG_MAX_DEFAULT_VALUE;
    const annualRange = getAnnualRange(range);
    const isDividendsPercent = Number.isFinite(dividendsPercent);

    const metrics = (
        <>
            <CloudSection>
                <div className={styles.indicators}>
                    {dividends && isDividendsPercent &&
                        <IndicatorSection
                            title='Dividend Yield'
                            info={
                                <>
                                    <p>Dividend Yield: <b>{dividendsPercent?.toFixed(2)}</b>%.</p>
                                    <p>The average dividend yield across all stocks is&nbsp;
                                        <b>{dividends.avg.toFixed(2)}</b>%.</p>
                                </>
                            }
                        >
                            <ChartRange
                                min={dividends.min}
                                max={dividends.max}
                                value={dividendsPercent}
                            />
                        </IndicatorSection>
                    }

                    {dividendsCurrentSector && isDividendsPercent &&
                        <IndicatorSection
                            title='Dividend Yield within the sector'
                            info={<p>The average dividend yield within the sector is&nbsp;
                                <b>{dividendsCurrentSector.avg.toFixed(2)}</b>%.</p>}
                        >
                            <ChartRange
                                min={dividendsCurrentSector.min}
                                max={dividendsCurrentSector.max}
                                value={dividendsPercent}
                            />
                        </IndicatorSection>
                    }

                    {beta && betas &&
                        <IndicatorSection
                            title='Beta (β)'
                            info={
                                <>
                                    <p>Beta: <b>{beta.toFixed(2)}</b></p>
                                    <p>The average β across all stocks is&nbsp;
                                        <b>{betas.avg.toFixed(2)}</b>.</p>
                                </>
                            }
                        >
                            <ChartRange
                                max={BETA_MAX}
                                value={beta}
                            />
                        </IndicatorSection>
                    }

                    {betasCurrentSector && beta && betas &&
                        <IndicatorSection
                            title='Beta (β) within the sector'
                            info={<p>The average β within the sector is&nbsp;
                                <b>{betasCurrentSector.avg.toFixed(2)}</b>.</p>}
                        >
                            <ChartRange
                                min={betasCurrentSector.min}
                                max={betasCurrentSector.max}
                                value={beta}
                            />
                        </IndicatorSection>
                    }

                    {annualRange && price &&
                        <IndicatorSection
                            title='Annual range'
                            info={
                                <>
                                    <p>Current price is&nbsp;<b>{formatNumber(price, false, true)}</b>.</p>
                                    <p>Annual range is&nbsp;<b>{range}</b>.</p>
                                </>
                            }
                        >
                            <ChartRange
                                min={annualRange.min}
                                max={annualRange.max}
                                value={price}
                            />
                        </IndicatorSection>
                    }
                </div>
            </CloudSection>
            <CloudSection
                title='Financial'
                className={typographyStyles.wrapper}
            >
                {marketCap && <p>Market Capitalization: <b>{formatHugeNumber(marketCap)}</b></p>}
                {volume && <p>Volume: <b>{formatHugeNumber(volume)}</b></p>}
                {averageVolume && <p>Average Volume: <b>{formatHugeNumber(averageVolume)}</b></p>}
                {lastDividend !== null
                    && <p>Dividends per Share: <b>{formatNumber(lastDividend, false, true)}</b></p>
                }
            </CloudSection>
        </>
    )

    const about = (
        <>
            <CloudSection
                title='Company profile'
                className={typographyStyles.wrapper}
            >
                {sector && <p>Sector: <b>{sector}</b></p>}
                {industry && <p>Industry: <b>{industry}</b></p>}
                {fullTimeEmployees && <p>Employees: <b>{formatNumber(fullTimeEmployees)}</b></p>}
                {ceo && <p>Ceo: <a target='_blank' href={GOOGLE_SEARCH_URL + ceo}><b>{ceo}</b></a></p>}
                {cik && <p>Cik: <b>{cik}</b></p>}
                {isin && <p>Isin: <b>{isin}</b></p>}
                {cusip && <p>Cusip: <b>{cusip}</b></p>}
                {exchangeFullName && <p>Exchange: <b>{exchangeFullName}</b></p>}
                {ipoDate && <p>Ipo date: <b>{new Date(ipoDate).toLocaleDateString()}</b></p>}

                <h4>About</h4>
                <div className={typographyStyles.smallText}>
                    {description}
                </div>
            </CloudSection>
            <CloudSection
                title='Contacts'
                className={typographyStyles.wrapper}
            >
                <CompanyContacts
                    className={styles.contacts}
                    address={getAddressString(address, city, state, country, zip)}
                    phone={phone}
                    website={website}
                />
            </CloudSection>
        </>
    )

    const tabs: TabItem[] = [
        {label: 'Metrics', content: metrics},
        {label: 'Operations', content: <TickerOperations symbol={ticker}/>},
        {label: 'About', content: about},
    ];

    return (
        <section className={styles.main}>
            <TickerHeader
                symbol={ticker}
                title={title}
                price={priceLocal}
                sector={sector}
                change={change}
                changePercentage={changePercentage}
            />
            <TickerInPortfolio
                className={styles.portfolio}
                symbol={ticker}
                price={price}
            />
            <ChartAreaModule
                ticker={ticker}
                xAxisLabel='Date'
            />
            <Tabs tabs={tabs} isGap />
            <TickerActions
                className={styles.actions}
                symbol={ticker || ''}
                title={title}
                price={price || 0}
            />
        </section>
    );
};

export default TickerPage;