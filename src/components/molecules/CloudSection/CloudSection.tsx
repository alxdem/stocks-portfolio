import { ICloudSection } from '@molecules/CloudSection/CloudSection.props';
import styles from '@molecules/CloudSection/CloudSection.module.css';
import cn from 'classnames';

const CloudSection = ({ children, title, className }: ICloudSection): JSX.Element => {
    return (
        <div className={cn(styles.cloud, className)}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {children}
        </div>
    );
};

export default CloudSection;