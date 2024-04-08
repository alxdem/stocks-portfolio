interface AppModalProps {
    isOpened: boolean;
    onClose?: () => void;
    children?: string | JSX.Element | JSX.Element[];
}

export interface IAppModal extends React.HTMLAttributes<HTMLDivElement> {
    (
        props: AppModalProps
    ): string | JSX.Element | null;
}