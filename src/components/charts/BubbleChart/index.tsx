'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BubbleChartData, ChartMargin } from '@/src/types/chartsDataTypes';
import {
  CHART_HEIGHT,
  CHART_WIDTH,
  COLORS,
  MARGIN,
} from '@/src/constants/layout';
import { chartColors } from '@/src/constants/colors';

interface BubbleChartProps {
  data: BubbleChartData[];
  height?: number;
  width?: number;
  margin?: ChartMargin;
  colors?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  zAxisLabel?: string;
}

const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  height = CHART_HEIGHT,
  width = CHART_WIDTH,
  margin = MARGIN,
  colors = COLORS,
  xAxisLabel = '',
  yAxisLabel = '',
  zAxisLabel = '',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const isDate = data[0].xValue instanceof Date;

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('overflow', 'visible');

    const x = isDate
      ? d3
          .scaleUtc()
          .domain(d3.extent(data, (d) => d.xValue) as [Date, Date])
          .range([0, width])
      : d3
          .scaleLinear()
          .domain(
            d3.extent(data, (d) => d.xValue as number) as [number, number]
          )
          .range([0, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.yValue) as number])
      .nice()
      .range([height, 0]);

    const z = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.zValue) as number])
      .range([4, 40]);

    const tooltip = d3
      .select(svgRef.current.parentElement)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px');

    svg.selectAll('g').remove();

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.xValue) as number)
      .attr('cy', (d) => y(d.yValue) as number)
      .attr('r', (d) => z(d.zValue) as number)
      .style('fill', (d, i) => {
        return colors[i % colors.length];
      })
      .style('opacity', '0.7')
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .on('mouseover', function (event, d) {
        tooltip.transition().duration(200).style('opacity', 1);
        tooltip
          .html(
            `${yAxisLabel}: ${d.yValue}<br/>${zAxisLabel}: ${
              d.zValue
            }<br/>${xAxisLabel}: ${d.xValue.toString().slice(0, 15)}`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 20 + 'px');
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0);
      });

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .call((g) => {
        g.select('.domain').attr('stroke', chartColors.secondaryTextColor);
        g.selectAll('.tick line').attr('stroke', chartColors.strokeColor);
      })
      .selectAll('text')
      .attr('fill', chartColors.secondaryTextColor)
      .style('text-anchor', 'middle');

    svg
      .append('g')
      .call(d3.axisLeft(y))
      .call((g) => {
        g.select('.domain').attr('stroke', chartColors.secondaryTextColor);
        g.selectAll('.tick line').attr('stroke', chartColors.strokeColor);
      })
      .selectAll('text')
      .attr('fill', chartColors.secondaryTextColor);

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.top + 20)
      .style('text-anchor', 'middle')
      .text(xAxisLabel);

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(yAxisLabel);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BubbleChart;
