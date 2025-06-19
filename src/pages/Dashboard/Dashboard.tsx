import {useAppSelector} from '@/store/hooks';
import styles from '@pages/Dashboard/Dashboard.module.css';
import ChartPieModule from '@organisms/ChartPieModule/ChartPieModule';
import {selectSectors, selectPortfolioChartPie, selectNetAssetValue, selectDeposit, selectAssetTypesChartPie} from '@/store/selectors/userSelectors';
import BalanceCard from '@molecules/BalanceCard/BalanceCard';

const DashboardPage = () => {
    const dataPortfolio = useAppSelector(selectPortfolioChartPie);
    const dataSectors = useAppSelector(selectSectors);
    const netAssetValue = useAppSelector(selectNetAssetValue);
    const deposit = useAppSelector(selectDeposit);
    const dataAssetTypes = useAppSelector(selectAssetTypesChartPie);

    return (
        <div className={styles.main}>
            <BalanceCard
                className={styles.column2}
                title='Balance'
                value={netAssetValue}
                deposit={deposit}
            />
            <ChartPieModule
                className={styles.column2}
                data={dataAssetTypes}
            />
            <ChartPieModule
                className={styles.column2}
                data={dataPortfolio}
            />
            <ChartPieModule
                className={styles.column2}
                data={dataSectors}
            />
        </div>
    );
};

export default DashboardPage;