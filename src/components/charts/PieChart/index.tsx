'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { type } from 'os';

interface PieChartData {
  label: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
  width?: number;
  height?: number;
  colors?: string[];
  type?: 'pie' | 'donut';
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 400,
  height = 400,
  colors,
  type = 'pie',
}) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<PieChartData>().value((d) => d.value);

    var arc = d3
      .arc<d3.PieArcDatum<PieChartData>>()
      .innerRadius(type === 'pie' ? 0 : radius - 100)
      .outerRadius(type === 'pie' ? radius : radius - 20);

    const arcs = svg
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => {
        return colors ? colors[i % colors.length] : color(i.toString());
      })
      .append('title')
      .text((d) => `${d.data.label}: ${d.data.value}`);

    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d) => d.data.label);
  }, [data, width, height, colors]);

  return <svg ref={chartRef} width={width} height={height}></svg>;
};

export default PieChart;
