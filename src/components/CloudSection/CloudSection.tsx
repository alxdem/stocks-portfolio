import { ICloudSection } from './CloudSection.props';
import styles from './CloudSection.module.css';
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