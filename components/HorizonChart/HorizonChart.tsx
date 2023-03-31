import * as React from 'react';
import * as d3 from 'd3';
import Box from '@mui/material/Box';
import { useD3 } from '../../hooks';
import { HorizonChartData } from '../../types';

interface Props {
  bands: number;
  colorScheme: string;
  data: HorizonChartData[];
}

const x = (d: HorizonChartData) => new Date(d.date); // given d for data, returns the (temporal) x-value
const y = (d: HorizonChartData) => d.value; // given d for data, returns the (quantitative) y-value
const z = (d: HorizonChartData) => d.name; // given d for data, returns the (categorical) z-value
const curve: d3.CurveGenerator = d3.curveLinear; // method of interpolation between points
const marginTop = 20; // top margin, in pixels
const marginRight = 0; // right margin, in pixels
const marginBottom = 0; // bottom margin, in pixels
const marginLeft = 0; // left margin, in pixels
const width = 640; // outer width, in pixels
const size = 25; // outer height of a single horizon, in pixels
const padding = 1; // separation between adjacent horizons
const xType: d3.ScaleTime<number, number, never> = d3.scaleUtc; // type of x-scale
const xRange: number[] = [marginLeft, width - marginRight]; // [left, right]
const yType: d3.ScaleLinear<number, number, never> = d3.scaleLinear; // type of y-scale

const HorizonChart: React.FC<Props> = ({ bands, colorScheme, data }) => {
  let defined: undefined | ((d: any, i: number) => boolean); // for gaps in data
  // const bands = 3; // number of bands
  let xDomain: number[]; // [xmin, xmax]
  let yDomain: number[]; // [ymin, ymax]
  const yRange: number[] = [size, size - bands * (size - padding)]; // [bottom, top]
  let zDomain: Set<number>; // array of z-values
  const scheme = d3[`scheme${colorScheme}`]; // color scheme; shorthand for colors
  const colors = scheme[Math.max(3, bands)]; // an array of colors

  // Compute values.
  const X: d3.Map<string> = d3.map(data, x);
  const Y: d3.Map<number> = d3.map(data, y);
  const Z: d3.Map<string> = d3.map(data, z);
  if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  const D: d3.Map<boolean> = d3.map(data, defined);
  console.log('D', D);

  // Compute default domains, and unique the z-domain.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];
  if (zDomain === undefined) zDomain = Z;
  zDomain = new d3.InternSet(zDomain);

  // Omit any data not present in the z-domain.
  const I: number[] = d3
    .range(X.length)
    .filter((i: number) => zDomain.has(Z[i]));

  // Compute height.
  const height: number = zDomain.size * size + marginTop + marginBottom;

  // Construct scales and axes.
  const xScale: d3.ScaleUtc = xType(xDomain, xRange);
  const yScale: d3.ScaleLinear = yType(yDomain, yRange);
  const xAxis = d3
    .axisTop(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0);

  // A unique identifier for clip paths (to avoid conflicts).
  const uid = `O-${Math.random().toString(16).slice(2)}`;

  // Construct an area generator.
  const area = d3
    .area()
    .defined((i: number) => D[i])
    .curve(curve)
    .x((i: number) => xScale(X[i]))
    .y0(yScale(0))
    .y1((i: number) => yScale(Y[i]));

  // Create the xAxis using a custom ref hook

  const renderXAxis = (
    svg: d3.Selection<SVGElement | null, unknown, null, undefined>
  ) => {
    svg
      .attr('transform', `translate(0,${marginTop})`)
      .call(xAxis)
      .call((g) =>
        g
          .selectAll('.tick')
          .attr('font-size', 12)
          .filter((d: number) => xScale(d) < 10 || xScale(d) > width - 10)
          .remove()
      )
      .call((g) => g.select('.domain').remove());
  };

  const xAxisDeps: React.DependencyList = [data.length, colorScheme, bands];
  const { ref: xAxisRef } = useD3<SVGGElement>({
    renderFn: renderXAxis,
    dependencies: xAxisDeps,
  });

  // Crerate the chart
  const renderChart = (
    svg: d3.Selection<SVGElement | null, unknown, null, undefined>
  ) => {
    svg = svg
      .selectAll('g')
      .data(d3.group(I, (i: number) => Z[i]))
      .join('g')
      .attr(
        'transform',
        (_: any, i: number) => `translate(0,${i * size + marginTop})`
      );

    const defs = svg.append('defs');

    defs
      .append('clipPath')
      .attr('id', (_: any, i: number) => `${uid}-clip-${i}`)
      .append('rect')
      .attr('y', padding)
      .attr('width', width)
      .attr('height', size - padding);

    defs
      .append('path')
      .attr('id', (_: any, i: number) => `${uid}-path-${i}`)
      .attr('d', ([, I]) => area(I));

    svg
      .attr('clip-path', (_, i: number) => {
        const l: any = location;
        return `url(${new URL(`#${uid}-clip-${i}`, l)})`;
      })
      .selectAll('use')
      .data((d: any, i: number) => new Array(bands).fill(i))
      .join('use')
      .attr('fill', (_, i: number) => colors[i + Math.max(0, 3 - bands)])
      .attr('transform', (_, i: number) => `translate(0,${i * size})`)
      .attr('xlink:href', (i: number) => {
        const l: any = location;
        return `${new URL(`#${uid}-path-${i}`, l)}`;
      });

    svg
      .append('text')
      .attr('x', marginLeft)
      .attr('y', (size + padding) / 2)
      .attr('dy', '0.35em')
      .attr('stroke', 'rgba(0, 0, 0, 0.6)')
      .attr('fill', '#fff')
      .text(([z]) => z);
  };

  const chartDeps: React.DependencyList = [data.length, colorScheme, bands];
  const { ref: chartRef } = useD3<SVGGElement>({
    renderFn: renderChart,
    dependencies: chartDeps,
  });

  return (
    <React.Fragment>
      <Box
        sx={{ display: 'flex', justifyContent: 'center' }}
        id="horizon-chart"
      >
        <svg
          id="svg-container"
          width="100%"
          height="100%"
          viewBox={`${[0, 0, width, height]}`}
          style={{
            maxWidth: '100%',
            height: 'auto intrinsic',
            marginTop: 0,
            paddingTop: 0,
          }}
          fontFamily={'Roboto'}
          fontSize={16}
        >
          <g ref={xAxisRef} id="x-axis" />
          <g ref={chartRef} id="chart" />
        </svg>
      </Box>
    </React.Fragment>
  );
};

export default HorizonChart;
