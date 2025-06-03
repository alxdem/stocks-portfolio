import type {ComponentPropsWithoutRef, ReactNode} from 'react';

export interface ModalProps extends ComponentPropsWithoutRef<'div'>{
    isOpened: boolean;
    children: ReactNode;
    onClose: () => void;
}
