import { chartColors } from '@/src/constants/colors';

interface XScaleProps {
  orientation: 'horizontal' | 'vertical';
  xScale: d3.ScaleLinear<number, number, never> | d3.ScaleBand<string>;
  innerHeight: number;
}

const XScale = ({ orientation, xScale, innerHeight }: XScaleProps) => {
  {
    return orientation === 'horizontal'
      ? (xScale as d3.ScaleLinear<number, number, never>)
          .ticks()
          .map((tickValue) => (
            <g
              transform={`translate(${xScale(tickValue as any)},0)`}
              key={tickValue}
            >
              <line
                y2={innerHeight}
                style={{
                  stroke: chartColors.strokeColor,
                }}
              ></line>
              <text
                dy=".71em"
                style={{
                  textAnchor: 'middle',
                  fill: chartColors.secondaryTextColor,
                }}
                y={innerHeight + 3}
              >
                {tickValue}
              </text>
            </g>
          ))
      : xScale.domain().map((tickValue) => (
          <text
            key={tickValue}
            dy=".91em"
            x={
              (xScale(tickValue as any) as number) +
              (xScale as d3.ScaleBand<string>).bandwidth() / 2
            }
            y={innerHeight + 3}
            style={{
              textAnchor: 'middle',
              fill: chartColors.mainTextColor,
            }}
          >
            {tickValue}
          </text>
        ));
  }
};

export default XScale;
