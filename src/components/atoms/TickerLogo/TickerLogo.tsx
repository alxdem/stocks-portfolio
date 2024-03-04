import { ITickerLogo } from '@atoms/TickerLogo/TickerLogo.props';
import styles from '@atoms/TickerLogo/TickerLogo.module.css';
import { ReactComponent as CapLogo } from '@svg/jewelry.svg';
import cn from 'classnames';

const TickerLogo = ({ imageSrc, alt, isRounded = false, className }: Partial<ITickerLogo>) => {
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