import { chartColors } from '@/src/constants/colors';

interface YScaleProps {
  orientation: 'horizontal' | 'vertical';
  yScale: d3.ScaleLinear<number, number, never> | d3.ScaleBand<string>;
}

const YScale = ({ orientation, yScale }: YScaleProps) => {
  return orientation === 'horizontal'
    ? yScale.domain().map((tickValue) => (
        <text
          key={tickValue}
          dy=".32em"
          x={-3}
          y={
            (yScale(tickValue as any) as number) +
            (yScale as d3.ScaleBand<string>).bandwidth() / 2
          }
          style={{
            textAnchor: 'end',
            fill: chartColors.mainTextColor,
          }}
        >
          {tickValue}
        </text>
      ))
    : (yScale as d3.ScaleLinear<number, number, never>)
        .ticks()
        .map((tickValue) => (
          <g
            transform={`translate(0, ${yScale(tickValue as any)})`}
            key={tickValue}
          >
            <line
              x2={innerWidth}
              style={{
                stroke: chartColors.strokeColor,
              }}
            ></line>
            <text
              dy=".32em"
              x={-3}
              y={0}
              style={{
                textAnchor: 'end',
                fill: chartColors.mainTextColor,
              }}
            >
              {tickValue}
            </text>
          </g>
        ));
};

export default YScale;
