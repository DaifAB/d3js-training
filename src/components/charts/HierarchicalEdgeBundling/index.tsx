'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface City {
  id: string;
  purchases: string[];
  x?: number;
  y?: number;
}

interface CityRelationChartProps {
  cities: City[];
}

function bundleEdges(links: any[], step: number = 0.2) {
  const map = new Map();

  links.forEach((link) => {
    const key = `${link.source.id},${link.target.id}`;
    const value = map.get(key) || 0;
    map.set(key, value + 1);
    link.bundled = value;
  });

  return links.map((link) => {
    const totalBundled = map.get(`${link.source.id},${link.target.id}`);
    const reverseBundled = totalBundled - link.bundled - 1;
    const offset = reverseBundled % 2 === 0 ? -1 : 1;

    const dx = link.target.x - link.source.x;
    const dy = link.target.y - link.source.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * step;

    const xOffset = (offset * dr * 2) / (totalBundled + 4);
    const yOffset = (offset * dr * 2) / (totalBundled + 4);

    return {
      source: {
        x: link.source.x + xOffset,
        y: link.source.y + yOffset,
      },
      target: {
        x: link.target.x + xOffset,
        y: link.target.y + yOffset,
      },
    };
  });
}

const CityRelationChart: React.FC<CityRelationChartProps> = ({ cities }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;
    const svg = d3.select(svgRef.current);

    // Create links based on city purchases
    const links: any[] = [];
    cities.forEach((city) => {
      city.purchases.forEach((purchase) => {
        const sourceCity = cities.find((c) => c.id === city.id);
        const targetCity = cities.find((c) => c.id === purchase);
        if (sourceCity && targetCity) {
          links.push({ source: sourceCity, target: targetCity });
        }
      });
    });

    const bundledLinks = bundleEdges(
      links.map((link) => ({
        source: {
          id: link.source.id,
          x: link.source.x || 0,
          y: link.source.y || 0,
        },
        target: {
          id: link.target.id,
          x: link.target.x || 0,
          y: link.target.y || 0,
        },
      }))
    );

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const lineGenerator = d3
      .line<{ x: number; y: number }>()
      .curve(d3.curveBasis)
      .x((d) => d.x)
      .y((d) => d.y);

    svg
      .selectAll('.link')
      .data(bundledLinks)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d) => lineGenerator([d.source, d.target]) || '')
      .style('stroke', 'black');

    svg
      .selectAll('.node')
      .data(cities)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 4.5)
      .attr('cx', (d) => d.x || 50)
      .attr('cy', (d) => d.y || height / 2)
      .style('fill', (d) => color(d.id));

    svg.attr('width', width).attr('height', height);
  }, [cities]);

  return <svg ref={svgRef}></svg>;
};

export default CityRelationChart;
