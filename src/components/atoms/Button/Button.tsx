import styles from './Button.module.css';
import { IButton, ButtonStyle, ButtonSize } from './Button.props';
import cn from 'classnames';

const Button = ({
    text,
    view = ButtonStyle.Primary,
    size = ButtonSize.M,
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