import { useMount } from '@src/hooks/useMount';
import { useKeyDowm } from '@src/hooks/useKeyDown';
import { useScreenFix } from '@src/hooks/useScreenFix';
import { createPortal } from 'react-dom';
import { IAppModal } from '@organisms/AppModal/AppModal.props';
import styles from '@organisms/AppModal/AppModal.module.css';
import { ReactComponent as CloseIcon } from '@svg/close.svg';
import cn from 'classnames';

const AppModal: IAppModal = ({ isOpened, onClose, children }) => {
    const { mounted } = useMount(isOpened);

    useKeyDowm(() => {
        onClose && onClose();
    }, ['Escape']);

    useScreenFix(mounted);

    const classes = cn(styles.modal, {
        [styles.active]: isOpened
    });

    if (!mounted) {
        return null;
    }

    return (
        <>
            {mounted && createPortal(
                <div className={classes} onClick={onClose}>
                    <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                        <button onClick={onClose} className={styles.button}>
                            <CloseIcon className={styles.closeIcon} />
                        </button>
                        {children}
                    </div>
                </div>,
                document.body
            )}
        </>

    );
};

export default AppModal;