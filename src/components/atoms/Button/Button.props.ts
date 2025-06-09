import type {ComponentPropsWithoutRef, ReactNode} from 'react';
import type {Link} from 'react-router';

type ButtonType = 'button' | 'link';

interface CommonButtonProps {
    as: ButtonType;
    theme?: 'primary' | 'secondary' | 'tertiary';
    size?: 'large' | 'medium' | 'small';
    children?: string | ReactNode;
    shape?: 'standard' | 'square';
}

interface ButtonAsButton extends CommonButtonProps, ComponentPropsWithoutRef<'button'> {
    as: 'button';
    to?: never;
}

export interface ButtonAsLink extends CommonButtonProps, ComponentPropsWithoutRef<typeof Link> {
    as: 'link';
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const isLinkProps = (props: ButtonProps): props is ButtonAsLink => {
    return props.as === 'link';
}
