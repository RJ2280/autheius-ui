import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphView = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    fetch('/api/neo4j/graph')
      .then(res => res.json())
      .then(data => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = 960;
        const height = 600;

        const simulation = d3.forceSimulation(data.nodes)
          .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
          .force('charge', d3.forceManyBody().strength(-300))
          .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .selectAll('line')
          .data(data.links)
          .enter().append('line')
          .attr('stroke-width', 1.5);

        const node = svg.append('g')
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .selectAll('circle')
          .data(data.nodes)
          .enter().append('circle')
          .attr('r', 10)
          .attr('fill', d => d.label === 'Lesson' ? '#1f77b4' : '#ff7f0e')
          .call(drag(simulation));

        const text = svg.append('g')
          .selectAll('text')
          .data(data.nodes)
          .enter().append('text')
          .text(d => d.id)
          .attr('font-size', 12)
          .attr('dx', 12)
          .attr('dy', 4);

        simulation.on('tick', () => {
          link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

          node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

          text
            .attr('x', d => d.x)
            .attr('y', d => d.y);
        });

        function drag(simulation) {
          return d3.drag()
            .on('start', (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on('drag', (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on('end', (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            });
        }
      });
  }, []);

  return (
    <div>
      <h2>🌐 Embedded Knowledge Graph</h2>
      <svg ref={svgRef} width={960} height={600}></svg>
    </div>
  );
};

export default GraphView;
