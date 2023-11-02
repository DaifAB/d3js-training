'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { BarChartData, ChartMargin } from '@/src/types/chartsDataTypes';
import { COLORS, MARGIN } from '@/src/constants/layout';
import { chartColors } from '@/src/constants/colors';

interface BarChartProps {
  data: BarChartData[];
  height?: number;
  width?: number;
  margin?: ChartMargin;
  colors?: string;
  animate?: boolean;
  animationDuration?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  orientation?: 'horizontal' | 'vertical';
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 500,
  width = 960,
  margin = MARGIN,
  colors = COLORS,
  animate = true,
  animationDuration = 2000,
  xAxisLabel = '',
  yAxisLabel = '',
  orientation = 'vertical',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('g').remove();

    const bars = svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label) || 0)
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', (d, i) => {
        return colors[i % colors.length];
      });

    if (animate) {
      bars
        .attr('height', 0)
        .attr('y', height - margin.bottom)
        .transition()
        .duration(1000)
        .attr('height', (d) => y(0) - y(d.value))
        .attr('y', (d) => y(d.value));
    }

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .call((g) => {
        g.select('.domain').attr('stroke', chartColors.secondaryTextColor);
        g.selectAll('.tick line').attr('stroke', chartColors.strokeColor);
      })
      .selectAll('text')
      .attr('fill', chartColors.secondaryTextColor);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
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
      .attr('y', height)
      .style('text-anchor', 'middle')
      .text(xAxisLabel);

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', 0)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(yAxisLabel);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
