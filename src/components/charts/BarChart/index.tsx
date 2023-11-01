'use client';

import { BarChartData, ChartMargin } from '@/src/types/chartsDataTypes';
import * as d3 from 'd3';
import { chartColors } from '@/src/constants/colors';
import XScale from './XScale';
import YScale from './YScale';
import Bar from './Bar';

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
        <XScale
          orientation={orientation}
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <YScale orientation={orientation} yScale={yScale} />
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
            <Bar
              key={d.label}
              orientation={orientation}
              d={d}
              xScale={xScale}
              yScale={yScale}
              color={color}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default BarChart;
