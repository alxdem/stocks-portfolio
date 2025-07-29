import cn from 'classnames';
import styles from '@atoms/Logo/Logo.module.css';
import type {LogoProps} from '@atoms/Logo/Logo.props';
import LogoIcon from '@images/jewelry.svg?react';
import {useState, useEffect} from 'react';
import {LOGO_URL} from '@utils';

const loadedLogos = new Set<string>();

const Logo = ({symbol, className, alt}: LogoProps) => {
    const [isFallback, setIsFallback] = useState(false);
    const [isLoaded, setIsLoaded] = useState(loadedLogos.has(symbol));

    const imageUrl = `${LOGO_URL}/${symbol}.webp`;

    const classes = cn(
        styles.logo,
        className,
    );

    useEffect(() => {
        if (isLoaded || isFallback) {
            return;
        }

        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            loadedLogos.add(symbol);
            setIsLoaded(true);
        }

        img.onerror = () => {
            setIsFallback(true);
        };
    }, [symbol, isLoaded, isFallback]);

    const element = (isFallback || !isLoaded)
        ? <LogoIcon/>
        : <img
            src={imageUrl}
            alt={alt}
            loading='lazy'
        />;

    return (
        <div className={classes}>
            {element}
        </div>
    );
};

export default Logo;