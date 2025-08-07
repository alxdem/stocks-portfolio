import {useAppSelector} from '@/store/hooks';
import {selectTotalFee} from '@/store/selectors/userSelectors';
import {formatNumber} from '@utils';

const AnalyticsPage = () => {
    const totalFee = useAppSelector(selectTotalFee);
    const feeFormatted = formatNumber(totalFee, false, true);

    return (
        <div>
            <h1>Analytics</h1>
            TotalFee: {feeFormatted}
        </div>
    );
};

export default AnalyticsPage;