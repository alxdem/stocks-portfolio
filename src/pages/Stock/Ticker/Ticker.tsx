import TickerHeader from '@molecules/TickerHeader/TickerHeader';
import {formatNumber, formatHugeNumber} from '@utils';
import CloudSection from '@molecules/CloudSection/CloudSection';
import styles from '@pages/Stock/Ticker/Ticker.module.css';
import typographyStyles from '@/styles/typography.module.css';
import cn from 'classnames';
import TickerActions from '@organisms/TickerActions/TickerActions';

const TickerPage = () => {
    // TODO: Change on actually data
    const temp = {
        "symbol": "HBAN",
        "price": 201.5,
        "beta": 1.405,
        "volAvg": 9323078,
        "mktCap": 151932007500,
        "lastDiv": 0,
        "range": "128.88-209.66",
        "changes": 0.47,
        "companyName": "Huntington Bancshares Incorporated",
        "currency": "USD",
        "cik": "0000012927",
        "isin": "US0970231058",
        "cusip": "097023105",
        "exchange": "New York Stock Exchange",
        "exchangeShortName": "NYSE",
        "industry": "Aerospace & Defense",
        "website": "https://www.boeing.com",
        "description": "The Boeing Company, together with its subsidiaries, designs, develops, manufactures, sales, services, and supports commercial jetliners, military aircraft, satellites, missile defense, human space flight and launch systems, and services worldwide. The company operates through four segments: Commercial Airplanes; Defense, Space & Security; Global Services; and Boeing Capital. The Commercial Airplanes segment provides commercial jet aircraft for passenger and cargo requirements, as well as fleet support services. The Defense, Space & Security segment engages in the research, development, production, and modification of manned and unmanned military aircraft and weapons systems; strategic defense and intelligence systems, which include strategic missile and defense systems, command, control, communications, computers, intelligence, surveillance and reconnaissance, cyber and information solutions, and intelligence systems; and satellite systems, such as government and commercial satellites, and space exploration. The Global Services segment offers products and services, including supply chain and logistics management, engineering, maintenance and modifications, upgrades and conversions, spare parts, pilot and maintenance training systems and services, technical and maintenance documents, and data analytics and digital services to commercial and defense customers. The Boeing Capital segment offers financing services and manages financing exposure for a portfolio of equipment under operating leases, sales-type/finance leases, notes and other receivables, assets held for sale or re-lease, and investments. The company was incorporated in 1916 and is based in Chicago, Illinois.",
        "ceo": "Mr. Robert K. Ortberg",
        "sector": "Industrials",
        "country": "US",
        "fullTimeEmployees": "172000",
        "phone": "7034146338",
        "address": "929 Long Bridge Drive",
        "city": "Arlington",
        "state": "VA",
        "zip": "22202",
        "dcfDiff": 308.60339,
        "dcf": -132.37339494704082,
        "image": "https://financialmodelingprep.com/image-stock/BAC.png",
        "ipoDate": "1962-01-02",
        "defaultImage": false,
        "isEtf": false,
        "isActivelyTrading": true,
        "isAdr": false,
        "isFund": false
    }

    const {
        companyName,
        image,
        price,
        sector,
        industry,
        symbol,
        description,
        city,
        country,
        fullTimeEmployees = '',
        ipoDate,
        range = '',
        mktCap,
        lastDiv,
        phone,
        volAvg,
        website,
        ceo,
    } = temp || {};

    const title = `${companyName} (${symbol})`;
    const priceLocal = `${formatNumber(price, false, true)}`;

    return (
        <section className={cn(styles.main, typographyStyles.wrapper)}>
            <TickerHeader
                logo={image}
                title={title}
                price={priceLocal}
                sector={sector}
            />
            <CloudSection className={styles.inner}>
                <>
                    <h2>Indicators</h2>
                    {range && <p>Annual range: {range}</p>}
                    {mktCap && <p>Market Capitalization: {formatHugeNumber(mktCap)}</p>}
                    {volAvg && <p>Average Volume: {formatHugeNumber(volAvg)}</p>}
                    {lastDiv !== null && <p>Dividends per Share: {lastDiv}</p>}

                    <h2>Company profile</h2>
                    {sector && <p>Sector: <b>{sector}</b></p>}
                    {industry && <p>Industry: <b>{industry}</b></p>}
                    {fullTimeEmployees && <p>Employees: <b>{formatNumber(fullTimeEmployees)}</b></p>}
                    {ceo && <p>Ceo: <b>{ceo}</b></p>}

                    <div className={typographyStyles.smallText}>
                        {description}
                    </div>

                    {ipoDate && <p>Ipo date: {ipoDate}</p>}
                    {city && <p>City: {city}</p>}
                    {country && <p>Country: {country}</p>}
                    {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
                    {website && <p>Website: <a href={`${website}`} target='_blank'>{website}</a></p>}
                </>
                <TickerActions
                    className={styles.actions}
                    symbol={symbol}
                    title={title}
                    image={image}
                    price={price}
                />
            </CloudSection>
        </section>
    );
};

export default TickerPage;