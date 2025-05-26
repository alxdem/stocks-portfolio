import type {OperationCardMobileProps} from '@organisms/OperationCard/OperationCardMobile/OperationCardMobile.props';
import Logo from '@atoms/Logo/Logo';
import styles from '@organisms/OperationCard/OperationCardMobile/OperationCardMobile.module.css';
import cn from "classnames";

const OperationCardMobile = ({name, logo, date, time, price, value, total, isTotalPlus, className}: OperationCardMobileProps) => {
    const classes = cn(
        styles.card,
        className,
        isTotalPlus ? styles.plus : styles.minus,
        !price ? styles.service : null,
    );

    return (
        <div className={classes}>
            <Logo
                src={logo}
                alt={name}
                className={styles.logo}
            />
            <span className={styles.name}>{name}</span>
            <span className={styles.date}>{date}</span>
            <span className={styles.time}>{time}</span>
            {price && <span className={styles.price}>{price}</span>}
            {value && <span className={styles.value}>{value}</span>}
            <span className={styles.total}>{total}</span>
        </div>
    );
};

export default OperationCardMobile;