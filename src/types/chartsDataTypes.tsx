export interface BarChartData {
  label: string;
  value: number;
}

export interface LineChartData {
  xValue: number | Date;
  yValue: number;
}

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
