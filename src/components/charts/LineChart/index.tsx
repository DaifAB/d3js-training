'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { ChartMargin, LineChartData } from '@/src/types/chartsDataTypes';
import { chartColors } from '@/src/constants/colors';

const MARGIN: ChartMargin = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 100,
};

interface LineChartProps {
  data: LineChartData[];
  height?: number;
  width?: number;
  margin?: ChartMargin;
  color?: string;
  isArea?: boolean;
  animate?: boolean;
  animationDuration?: number;
  yAxisLabel?: string;
  lineWeight?: number;
}

const LineChart = ({
  data,
  height = 500,
  width = 960,
  margin = MARGIN,
  color = 'steelblue',
  isArea = false,
  animate = false,
  animationDuration = 2000,
  yAxisLabel = '',
  lineWeight = 1.5,
}: LineChartProps) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const isDate = data[0].xValue instanceof Date;

    const x = isDate
      ? d3
          .scaleUtc()
          .domain(d3.extent(data, (d) => d.xValue) as [Date, Date])
          .range([margin.left, width - margin.right])
      : d3
          .scaleLinear()
          .domain(
            d3.extent(data, (d) => d.xValue as number) as [number, number]
          )
          .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.yValue) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<LineChartData>()
      .x((d) => x(d.xValue))
      .y((d) => y(d.yValue));

    const area = d3
      .area<LineChartData>()
      .x((d) => x(d.xValue)!)
      .y0(height - margin.bottom)
      .y1((d) => y(d.yValue)!);

    const svg = d3
      .select(chartRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible');

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )
      .call((g) => {
        g.selectAll('.tick text').attr('fill', chartColors.secondaryTextColor);
        g.selectAll('.tick line').attr(
          'stroke',
          chartColors.secondaryTextColor
        );
      });

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select('.domain').remove())
      .call((g) => {
        g.selectAll('.tick line')
          .attr('x2', width - margin.left - margin.right)
          .attr('stroke', chartColors.strokeColor);
        g.selectAll('.tick text').attr('fill', chartColors.secondaryTextColor);
      })
      .append('text')
      .attr('x', -margin.left)
      .attr('y', 10)
      .attr('fill', chartColors.mainTextColor)
      .attr('text-anchor', 'start')
      .text(yAxisLabel);

    const linePath = svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', lineWeight)
      .attr('d', line);

    const totalLength = linePath.node()?.getTotalLength();

    if (totalLength && animate) {
      linePath
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(animationDuration)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }

    if (isArea) {
      svg
        .append('path')
        .datum(data)
        .attr('fill', color)
        .attr('fill-opacity', 0.3)
        .attr('d', area);
    }
  }, [data, height, width, margin]);

  return <svg ref={chartRef}></svg>;
};

export default LineChart;
