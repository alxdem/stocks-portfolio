import {useAppSelector} from '@/store/hooks';
import CloudSection from '@molecules/CloudSection/CloudSection';
import {sortOperations} from '@utils';
import {selectOperations} from '@/store/selectors/userSelectors';
import {useMemo} from 'react';
import OperationsList from '@organisms/OperationsList/OperationsList';

const OperationsPage = () => {
    const operations = useAppSelector(selectOperations);
    const sortedOperations = useMemo(() => sortOperations(operations), [operations]);

    return (
        <section>
            <CloudSection>
                <OperationsList items={sortedOperations}/>
            </CloudSection>
        </section>
    );
};

export default OperationsPage;