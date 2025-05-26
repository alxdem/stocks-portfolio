import cn from 'classnames';
import styles from '@atoms/Logo/Logo.module.css';
import type { LogoProps } from '@atoms/Logo/Logo.props';
import LogoIcon from '@images/jewelry.svg?react';

const Logo = ({className, src, alt}: LogoProps) => {
    const logoElement = src ? <img src={src} alt={alt} /> : <LogoIcon />

    return (
        <div className={cn(styles.logo, className)}>
            {logoElement}
        </div>
    );
};

export default Logo;