import cn from 'classnames';
import styles from '@atoms/Logo/Logo.module.css';
import type { LogoProps } from '@atoms/Logo/Logo.props';
import LogoIcon from '@images/jewelry.svg?react';

const Logo = ({className, src, alt}: LogoProps) => {
    const logoElement = src ? <img src={src} alt={alt} /> : <LogoIcon />
    const classes = cn(
        styles.logo,
        className,
    );

    return (
        <div className={classes}>
            {logoElement}
        </div>
    );
};

export default Logo;