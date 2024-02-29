import { DetailedHTMLProps, HTMLAttributes } from 'react';

export enum ButtonStyle {
    Primary = 'primary',
    Secondary = 'secondary',
    Tetriary = 'tetriary'
}

export enum ButtonSize {
    L = 'large',
    M = 'medium',
    S = 'small'
}

export interface IButton extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string;
    view?: ButtonStyle
    disabled?: boolean;
    size?: ButtonSize;
}