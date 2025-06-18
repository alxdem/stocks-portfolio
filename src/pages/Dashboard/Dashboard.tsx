import {useAppSelector} from '@/store/hooks';
import styles from '@pages/Dashboard/Dashboard.module.css';
import ChartPieModule from '@organisms/ChartPieModule/ChartPieModule';
import {selectSectors, selectPortfolioChartPie} from '@/store/selectors/userSelectors';

const DashboardPage = () => {
    const dataPortfolio = useAppSelector(selectPortfolioChartPie);
    const dataSectors = useAppSelector(selectSectors);

    return (
        <div className={styles.main}>
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