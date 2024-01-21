import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { getCompanyApiUrl } from '../../../utils/utils';
import CloudSection from '../../../components/CloudSection/CloudSection';
import styles from './Ticker.module.css';
import TickerHeader from '../../../components/TickerHeader/TickerHeader';
import { ITickerPage } from '../../../models/common';
import { formatPrice, formatHugeNumber } from '../../../utils/utils';

const TickerPage = () => {

    const temp = {
        "symbol": "HBAN",
        "price": 10.9005,
        "beta": 1.123,
        "volAvg": 14117646,
        "mktCap": 15784796040,
        "lastDiv": 0.62,
        "range": "9.13-15.74",
        "changes": -0.1695,
        "companyName": "Huntington Bancshares Incorporated",
        "currency": "USD",
        "cik": "0000049196",
        "isin": "US4461501045",
        "cusip": "446150104",
        "exchange": "NASDAQ Global Select",
        "exchangeShortName": "NASDAQ",
        "industry": "Banks—Regional",
        "website": "https://www.huntington.com",
        "description": "Huntington Bancshares Incorporated operates as the bank holding company for The Huntington National Bank that provides commercial, consumer, and mortgage banking services in the United States. The company operates through four segments: Consumer and Business Banking; Commercial Banking; Vehicle Finance; and Regional Banking and The Huntington Private Client Group (RBHPCG). The Consumer and Business Banking segment offers financial products and services, such as checking accounts, savings accounts, money market accounts, certificates of deposit, credit cards, and consumer and small business loans, as well as investment products. This segment also provides mortgages, insurance, interest rate risk protection, foreign exchange, automated teller machine, and treasury management services, as well as online, mobile, and telephone banking services. It serves consumer and small business customers. The Commercial Banking segment offers regional commercial banking solutions for middle market businesses, government and public sector entities, and commercial real estate developers/REITs; and specialty banking solutions for healthcare, technology and telecommunications, franchise finance, sponsor finance, and global services industries. It also provides asset finance services; capital raising solutions, sales and trading, and corporate risk management products; institutional banking services; and treasury management services. The Vehicle Finance segment provides financing to consumers for the purchase of automobiles, light-duty trucks, recreational vehicles, and marine craft at franchised and other select dealerships, as well as to franchised dealerships for the acquisition of new and used inventory. The RBHPCG segment offers private banking, wealth and investment management, and retirement plan services. As of March 18, 2022, the company had approximately 1,000 branches in 11 states. Huntington Bancshares Incorporated was founded in 1866 and is headquartered in Columbus, Ohio.",
        "ceo": "Mr. Stephen D. Steinour",
        "sector": "Financial Services",
        "country": "US",
        "fullTimeEmployees": "20073",
        "phone": "614 480 2265",
        "address": "Huntington Center",
        "city": "Columbus",
        "state": "OH",
        "zip": "43287",
        "dcfDiff": -61.23608,
        "dcf": 72.30608403600795,
        "image": "https://financialmodelingprep.com/image-stock/HBAN.png",
        "ipoDate": "1980-03-17",
        "defaultImage": false,
        "isEtf": false,
        "isActivelyTrading": true,
        "isAdr": false,
        "isFund": false
    }

    const { ticker } = useParams();
    const [data, error, isLoading] = useFetch<ITickerPage[]>(getCompanyApiUrl(ticker || ''), []);
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
    } = data[0] || {};

    if (!companyName) {
        return <CloudSection>Information not found</CloudSection>
    }

    return (
        <>
            <TickerHeader
                title={companyName}
                logo={image}
                price={price}
                industry={industry}
                symbol={symbol}
                className={styles.header}
            />
            <CloudSection className={styles.main}>
                <>
                    <h2>Indicators</h2>
                    {range && <p>Annual range: {range}</p>}
                    {mktCap && <p>Market Capitalization: {formatHugeNumber(mktCap)}</p>}
                    {volAvg && <p>Average Volume: {formatHugeNumber(volAvg)}</p>}
                    {lastDiv && <p>Dividends per Share: {lastDiv}</p>}


                    <h2>Company profile</h2>
                    {sector && <p>Sector: <b>{sector}</b></p>}
                    {industry && <p>Industry: <b>{industry}</b></p>}
                    {fullTimeEmployees && <p>Employees: <b>{formatPrice(fullTimeEmployees)}</b></p>}
                    {ceo && <p>Ceo: <b>{ceo}</b></p>}

                    <div className={styles.description}>
                        {description}
                        {ipoDate && <p>Ipo date: {ipoDate}</p>}
                        {city && <p>City: {city}</p>}
                        {country && <p>Country: {country}</p>}
                        {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
                        {website && <p>Website: <a href={`${website}`} target='_blank'>{website}</a></p>}
                    </div>
                </>
            </CloudSection>

        </>
    );
};

export default TickerPage;