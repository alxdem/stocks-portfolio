import IndicatorTotal from '@atoms/IndicatorTotal/IndicatorTotal';
import styles from '@molecules/IndicatorsPane/IndicatorsPane.module.css';
import { IIndicatorsPane } from '@molecules/IndicatorsPane/IndicatorsPane.props';

const IndicatorsPane = ({ items }: IIndicatorsPane) => {
    const elements = items.map(item => {
        return (
            <IndicatorTotal
                key={item.id}
                value={item.value}
                percent={item.percent}
                title={item.title}
                type={item.type}
            />
        );
    });

    return (
        <div className={styles.pane}>{elements}</div>
    );
};

export default IndicatorsPane;