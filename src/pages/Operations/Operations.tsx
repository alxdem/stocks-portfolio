import CloudSection from '../../components/molecules/CloudSection/CloudSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import OperationsList from '../../components/organisms/OperationsList/OperationsList';

const OperationsPage = () => {
    const operations = useSelector((state: RootState) => state.user.operations);

    return (
        <section>
            <CloudSection>
                <OperationsList operations={operations} />
            </CloudSection>
        </section>
    );
}

export default OperationsPage;