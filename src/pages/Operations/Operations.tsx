import CloudSection from '@molecules/CloudSection/CloudSection';
import OperationsList from '@organisms/OperationsList/OperationsList';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

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