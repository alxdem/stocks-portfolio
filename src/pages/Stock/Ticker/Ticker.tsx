import TickerHeader from '@organisms/TickerHeader/TickerHeader';
import {formatNumber, formatHugeNumber, getAddressString, BETA_MAX} from '@utils';
import CloudSection from '@molecules/CloudSection/CloudSection';
import styles from '@pages/Stock/Ticker/Ticker.module.css';
import typographyStyles from '@/styles/typography.module.css';
import cn from 'classnames';
import TickerActions from '@organisms/TickerActions/TickerActions';
import useTickerInfo from '@hooks/useTickerInfo';
import CompanyContacts from '@molecules/CompanyContacts/CompanyContacts';
import ChartPieNeedle from '@molecules/ChartPieNeedle/ChartPieNeedle';
import TickerInPortfolio from '@organisms/TickerInPortfolio/TickerInPortfolio';

const data = [
    {name: 'low', value: 1},
    {name: 'medium', value: 1},
    {name: 'high', value: 1},
];

const TickerPage = () => {
    const symbol = 'GE';
    const {info, isLoading} = useTickerInfo(symbol);

    const {
        companyName,
        image,
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
        exchange,
        address,
        state,
        zip,
    } = info || {};

    const title = `${companyName} (${symbol})`;
    const priceLocal = price ? `${formatNumber(price, false, true)}` : '';

    return (
        <section className={cn(styles.main, typographyStyles.wrapper)}>
            <TickerHeader
                logo={image}
                title={title}
                price={priceLocal}
                sector={sector}
                change={change}
                changePercentage={changePercentage}
            />
            <TickerInPortfolio
                className={styles.portfolio}
                symbol={symbol}
                price={price}
            />
            <CloudSection className={styles.inner}>
                <>
                    {isLoading && <p>LOADING...</p>}
                    <h2>Indicators</h2>

                    {beta && <div className={styles.beta}>
                        <ChartPieNeedle
                            data={data}
                            value={beta}
                            max={BETA_MAX}
                            cx={100}
                            cy={200}
                            text='beta'
                        />
                    </div>}

                    {range && <p>Annual range: {range}</p>}
                    {marketCap && <p>Market Capitalization: {formatHugeNumber(marketCap)}</p>}
                    {volume && <p>Volume: {formatHugeNumber(volume)}</p>}
                    {averageVolume && <p>Average Volume: {formatHugeNumber(averageVolume)}</p>}
                    {beta && <p>beta: {beta}</p>}
                    {lastDividend !== null && <p>Dividends per Share: {lastDividend}</p>}
                    {change && <p>change: {change}</p>}
                    {changePercentage && <p>ChangePercentage: {changePercentage}</p>}

                    <h2>Company profile</h2>
                    {sector && <p>Sector: <b>{sector}</b></p>}
                    {industry && <p>Industry: <b>{industry}</b></p>}
                    {fullTimeEmployees && <p>Employees: <b>{formatNumber(fullTimeEmployees)}</b></p>}
                    {ceo && <p>Ceo: <b>{ceo}</b></p>}
                    {cik && <p>cik: <b>{cik}</b></p>}
                    {isin && <p>isin: <b>{isin}</b></p>}
                    {cusip && <p>cusip: <b>{cusip}</b></p>}
                    {exchangeFullName && <p>exchangeFullName: <b>{exchangeFullName}</b></p>}
                    {exchange && <p>exchange: <b>{exchange}</b></p>}
                    {ipoDate && <p>Ipo date: {ipoDate}</p>}

                    <div className={typographyStyles.smallText}>
                        {description}
                    </div>

                    <h2>Contacts</h2>
                    <CompanyContacts
                        className={styles.contacts}
                        address={getAddressString(address, city, state, country, zip)}
                        phone={phone}
                        website={website}
                    />
                </>
                <TickerActions
                    className={styles.actions}
                    symbol={symbol || ''}
                    title={title}
                    image={image}
                    price={price || 0}
                />
            </CloudSection>
        </section>
    );
};

export default TickerPage;