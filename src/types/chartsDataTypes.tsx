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

export interface BubbleChartData {
  xValue: Date | number;
  yValue: number;
  zValue: number;
}

export interface PieChartData {
  label: string;
  value: number;
}
