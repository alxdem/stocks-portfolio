export interface ChartAreaProps<T, K extends keyof T = keyof T> {
    data: T[];
    xKey: K;
    yKey: K;
    isHorizontalGrid?: boolean;
    isVerticalGrid?: boolean;
    aspect?: number;
    xAxisLabel?: string;
}
