import type {CloudSectionProps} from '@molecules/CloudSection/CloudSection.props';
import cn from 'classnames';
import styles from '@molecules/CloudSection/CloudSection.module.css';

const CloudSection = ({ children, ref, title, className }: CloudSectionProps) => {
    return (
        <div ref={ref} className={cn(styles.cloud, className)}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {children}
        </div>
    );
};

export default CloudSection;