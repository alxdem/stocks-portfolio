import styles from '@atoms/Button/Button.module.css';
import { IButton, ButtonStyle, ButtonSize } from '@atoms/Button/Button.props';
import cn from 'classnames';
import { Link } from 'react-router-dom';

const Button = ({
    text,
    view = ButtonStyle.Primary,
    size = ButtonSize.M,
    href,
    disabled,
    className,
    ...restProps
}: IButton) => {
    const styleClass = cn(
        className,
        styles.button,
        view === ButtonStyle.Primary ? styles.primary : null,
        view === ButtonStyle.Secondary ? styles.secondary : null,
        view === ButtonStyle.Tetriary ? styles.tetriary : null,
        size === ButtonSize.L ? styles.large : null,
        size === ButtonSize.M ? styles.medium : null,
        size === ButtonSize.S ? styles.small : null
    );

    if (href) {
        return (
            <Link
                to={href}
                className={styleClass}
            >
                {text}
            </Link>
        )
    }

    return (
        <button
            className={styleClass}
            {...restProps}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;