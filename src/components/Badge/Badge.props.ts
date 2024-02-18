export enum BadgeColor {
    Green = 'green',
    Red = 'red',
    Gray = 'gray',
}

export interface IBadge extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    icon?: JSX.Element;
    color?: BadgeColor;
}