export interface IChartPie {
    data: IChartPieDataItem[];
}

export interface IChartPieDataItem {
    id: string;
    value: number;
    label?: string;
    color?: string;
}