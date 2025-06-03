import type {ModalProps} from '@organisms/Modal/Modal.props';
import styles from '@organisms/Modal/Modal.module.css';
import CloseIcon from '@images/close.svg?react';
import useKeyDown from '@hooks/useKeyDown';
import useScreenFix from '@hooks/useScreenFix';
import useModalMount from '@hooks/useModalMount';
import cn from 'classnames';
import {createPortal} from 'react-dom';

const Modal = ({isOpened, children, onClose}: ModalProps) => {
    const {mounted} = useModalMount(isOpened);
    useKeyDown(onClose, ['Escape']);
    useScreenFix(mounted);

    const classes = cn(
        styles.modal,
        isOpened && styles.active
    );

    if (!mounted) {
        return null;
    }

    return createPortal(
        <div
            className={classes}
            onClick={onClose}
        >
            <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                <button
                    className={styles.button}
                    onClick={onClose}
                >
                    <CloseIcon className={styles.closeIcon}/>
                </button>
                Modal
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;