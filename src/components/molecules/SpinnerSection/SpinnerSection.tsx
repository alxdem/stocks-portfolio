import styles from '@molecules/SpinnerSection/SpinnerSection.module.css';
import Spinner from '@atoms/Spinner/Spinner';
import cn from 'classnames';
import type {ComponentPropsWithoutRef} from 'react';

const SpinnerSection = ({className}: ComponentPropsWithoutRef<'div'>) => {
    return (
        <div className={cn(styles.spinnerWrapper, className)}>
            <Spinner className={styles.spinner}/>
        </div>
    );
};

export default SpinnerSection;
