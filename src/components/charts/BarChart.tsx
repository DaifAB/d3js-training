'use client';

import { BarChartData, ChartMargin } from '@/src/types/chartsDataTypes';
import * as d3 from 'd3';
import { chartColors } from '@/src/constants/colors';

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 100,
};

interface BarChartProps {
  data: BarChartData[];
  height?: any;
  width?: any;
  margin?: ChartMargin;
  colors?: string[];
  spacing?: number;
  axisLabel?: string;
  orientation?: 'horizontal' | 'vertical';
}

const BarChart = ({
  data,
  height = 500,
  width = 960,
  margin = MARGIN,
  colors = ['black'],
  spacing = 0.1,
  axisLabel = '',
  orientation = 'horizontal',
}: BarChartProps) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const labelsDomain = data.map((d) => d.label);
  const valuesDomain = [0, d3.max(data, (d) => d.value) as number];
  const test = 0;

  const xScale =
    orientation === 'horizontal'
      ? d3.scaleLinear().domain(valuesDomain).range([0, innerWidth])
      : d3
          .scaleBand()
          .domain(labelsDomain)
          .range([0, innerWidth])
          .padding(spacing);

  const yScale =
    orientation === 'horizontal'
      ? d3
          .scaleBand()
          .domain(labelsDomain)
          .range([0, innerHeight])
          .padding(spacing)
      : d3.scaleLinear().domain(valuesDomain).nice().range([innerHeight, 0]);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {orientation === 'horizontal'
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
            ))}
        {orientation === 'horizontal'
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
              ))}
        <text
          x={innerWidth / 2}
          y={innerHeight + 35}
          style={{
            textAnchor: 'middle',
            fill: chartColors.mainTextColor,
          }}
        >
          {axisLabel}
        </text>
        {data.map((d, i) => {
          const color = colors[i % colors.length];
          return (
            <rect
              key={d.label}
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
        })}
      </g>
    </svg>
  );
};

export default BarChart;
