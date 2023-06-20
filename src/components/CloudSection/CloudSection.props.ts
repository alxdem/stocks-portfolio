export interface ICloudSection extends React.HTMLAttributes<HTMLDivElement> {
    children: string | JSX.Element | JSX.Element[];
    title?: string;
}