import styles from '@atoms/Spinner/Spinner.module.css';
import cn from 'classnames';
import {memo, type ComponentPropsWithoutRef} from 'react';

const Spinner = memo(({className}: ComponentPropsWithoutRef<'svg'>) => {
    return (
        <svg
            className={cn(styles.spinner, className)}
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
        >
            <path fill='currentColor' d='M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z'
                  opacity='.25'/>
            <path fill='currentColor'
                  d='M10.72 19.9a8 8 0 0 1-6.5-9.79 7.77 7.77 0 0 1 6.18-5.95 8 8 0 0 1 9.49 6.52A1.54 1.54 0 0 0 21.38 12h.13a1.37 1.37 0 0 0 1.38-1.54 11 11 0 1 0-12.7 12.39A1.54 1.54 0 0 0 12 21.34a1.47 1.47 0 0 0-1.28-1.44Z'>
                <animateTransform
                    attributeName='transform'
                    dur='0.75s'
                    repeatCount='indefinite'
                    type='rotate'
                    values='0 12 12;360 12 12'
                />
            </path>
        </svg>
    );
});

export default Spinner;
