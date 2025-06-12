import {useAppSelector} from '@/store/hooks';
import styles from '@pages/Dashboard/Dashboard.module.css';
import ChartPieModule from '@organisms/ChartPieModule/ChartPieModule';
import type {ChartPieData} from '@models';
import {getPercent} from '@/utils';

const DashboardPage = () => {
    const portfolio = useAppSelector(state => state.user.portfolio);
    const assetsWorth = useAppSelector(state => state.user.assetsWorth);

    const dataPortfolio: ChartPieData[] = portfolio ? portfolio?.map(item => {
        const value = item.value * item.price;
        const percent = getPercent(assetsWorth, value).toFixed(2);

        return {
            name: item.name,
            value,
            percent,
        };
    }) : [];

    return (
        <div className={styles.main}>
            <ChartPieModule
                className={styles.column2}
                data={dataPortfolio}
            />
            <ChartPieModule
                className={styles.column2}
                data={dataPortfolio}
            />
        </div>
    );
};

export default DashboardPage;