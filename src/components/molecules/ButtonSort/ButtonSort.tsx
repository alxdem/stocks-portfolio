import type {ButtonSortProps} from '@molecules/ButtonSort/ButtonSort.props';
import styles from '@molecules/ButtonSort/ButtonSort.module.css';
import cn from 'classnames';
import ArrowIcon from '@images/arrow-circle.svg?react';

const ButtonSort = ({text, order = 'asc', isActive, isAlignRight, disabled, onClick, className}: ButtonSortProps) => {
    return (
        <button
            type='button'
            className={cn(
                styles.button,
                isAlignRight && styles.right,
                isActive && styles.active,
                order === 'desc' && styles.orderDesc,
                className,
            )}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
            <ArrowIcon className={styles.icon} />
        </button>
    );
};

export default ButtonSort;
