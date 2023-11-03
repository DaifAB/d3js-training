'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

interface MapProps {
  data: any;
}

const Map: React.FC<MapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 960;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g');

    const projection = d3
      .geoMercator()
      .scale(650)
      .center([-52, -15])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    d3.json('/files/geojson/BrazilGeoJson.json').then((jsonData: any) => {
      if (jsonData && jsonData.objects && jsonData.objects.estados) {
        const states = topojson.feature(
          jsonData,
          jsonData.objects.estados
        ) as any;
        const statesContour = topojson.mesh(
          jsonData,
          jsonData.objects.estados
        ) as any;

        g.selectAll('.estado')
          .data(states.features)
          .enter()
          .append('path')
          .attr('fill', '#ddd')
          .attr('class', 'state')
          .attr('d', path as any);

        g.append('path')
          .datum(statesContour)
          .attr('class', 'state_contour')
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', 'white');

        g.selectAll('.point')
          .data(data)
          .enter()
          .append('circle')
          .attr('class', 'point')
          .attr('cx', (d) => {
            console.log(d);

            const projected = projection(d as any);
            return projected ? projected[0] : 0;
          })
          .attr('cy', (d) => {
            const projected = projection(d as any);
            return projected ? projected[1] : 0;
          })
          .attr('r', 3)
          .attr('fill', 'none')
          .style('stroke', 'black');
      }
    });
  }, []);

  return <svg ref={svgRef} width={960} height={600} />;
};

export default Map;
