import {type ButtonProps, isLinkProps} from '@atoms/Button/Button.props';
import styles from '@atoms/Button/Button.module.css';
import cn from 'classnames';
import {Link} from 'react-router';

const Button = (props: ButtonProps) => {
    const { theme = 'primary', size = 'medium', children, className} = props;
    const classes = cn(
        styles.button,
        styles[theme],
        styles[size],
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
