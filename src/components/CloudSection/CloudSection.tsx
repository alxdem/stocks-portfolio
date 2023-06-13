import { ICloudSection } from './CloudSection.props';
import styles from './CloudSection.module.css';

const CloudSection = ({ children, title }: ICloudSection) => {
    return (
        <div className={styles.cloud}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {children}
        </div>
    );
};

export default CloudSection;