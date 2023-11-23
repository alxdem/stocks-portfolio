import { ITickerLogo } from './TickerLogo.props';
import styles from './TickerLogo.module.css';
import { ReactComponent as CapLogo } from '../../assets/svg/jewelry.svg';
import cn from 'classnames';

const TickerLogo = ({ imageSrc, alt, isRounded = false, className }: ITickerLogo) => {
    const classes = cn(
        className,
        isRounded ? styles.isRounded : null
    );

    const logo = imageSrc ? <img src={imageSrc} alt={alt || ''} /> : <CapLogo />;

    return (
        <div className={cn(styles.logo, classes)}>
            {logo}
        </div>
    );
};

export default TickerLogo;