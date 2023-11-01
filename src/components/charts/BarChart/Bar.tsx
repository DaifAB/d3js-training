import { BarChartData } from '@/src/types/chartsDataTypes';

interface BarProps {
  orientation: 'horizontal' | 'vertical';
  d: BarChartData;
  xScale: d3.ScaleLinear<number, number, never> | d3.ScaleBand<string>;
  yScale: d3.ScaleLinear<number, number, never> | d3.ScaleBand<string>;
  color: string;
}

const Bar = ({ orientation, d, xScale, yScale, color }: BarProps) => {
  return (
    <rect
      x={orientation === 'horizontal' ? 0 : xScale(d.label as any)}
      y={
        orientation === 'horizontal'
          ? yScale(d.label as any)
          : yScale(d.value as any)
      }
      width={
        orientation === 'horizontal'
          ? xScale(d.value as any)
          : (xScale as d3.ScaleBand<string>).bandwidth()
      }
      height={
        orientation === 'horizontal'
          ? (yScale as d3.ScaleBand<string>).bandwidth()
          : innerHeight - (yScale(d.value as any) as number)
      }
      style={{
        fill: color,
      }}
    >
      <title>{d.value}</title>
    </rect>
  );
};

export default Bar;
