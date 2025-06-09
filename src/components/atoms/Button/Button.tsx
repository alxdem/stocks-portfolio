import {type ButtonProps, isLinkProps} from '@atoms/Button/Button.props';
import styles from '@atoms/Button/Button.module.css';
import cn from 'classnames';
import {Link} from 'react-router';

const Button = (props: ButtonProps) => {
    const {
        theme,
        size,
        children,
        shape,
        className
    } = props;

    const themeLocal = theme ?? 'primary';
    const sizeLocal = size ?? 'medium';
    const shapeLocal = shape ?? 'standard';

    const classes = cn(
        styles.button,
        styles[themeLocal],
        styles[sizeLocal],
        styles[shapeLocal],
        className,
    );

    if (isLinkProps(props)) {
        return (
            <Link
                {...props}
                className={classes}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            {...props}
            className={classes}
        >
            {children}
        </button>
    );
};

export default Button;
