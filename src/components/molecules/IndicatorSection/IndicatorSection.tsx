import type {IndicatorSectionProps} from '@molecules/IndicatorSection/IndicatorSection.props';
import styles from '@molecules/IndicatorSection/IndicatorSection.module.css';
import cn from 'classnames';
import {cloneElement, isValidElement} from 'react';

const IndicatorSection = ({title, children, info, className}: IndicatorSectionProps) => {
    const childrenElement = children && isValidElement(children)
        ? cloneElement(children, {className: styles.children})
        : null;
    return (
        <div className={cn(styles.section, className)}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {childrenElement}
            {info && <div className={styles.info}>{info}</div>}
        </div>
    );
};

export default IndicatorSection;
