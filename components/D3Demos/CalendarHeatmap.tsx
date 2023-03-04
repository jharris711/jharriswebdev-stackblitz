import * as React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../../hooks';
import { CalendarHeatmapData } from '../../types';

interface Props {
  data: CalendarHeatmapData[];
}

const cellSize = 20;
const width = 928;
const colors = d3.interpolatePiYG;
const countDay = (i: number) => i;
const timeWeek = d3.utcSunday;
const weekDays = 7;
const height: number = cellSize * (weekDays + 2);
const formatDay: (i: number) => string = (i) => 'SMTWTFS'[i];

const CalendarHeatmap: React.FC<Props> = ({ data }) => {
  const x = (d: CalendarHeatmapData) => new Date(d.eventTimestamp);
  const y = (d: CalendarHeatmapData) => d.numEvents;

  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(X.length);

  // Compute a color scale. This assumes a diverging color scheme where the pivot
  // is zero, and we want symmetric difference around zero.
  const max = d3.quantile(Y, 0.9975, Math.abs);
  const color = d3.scaleSequential([-max, +max], colors).unknown('none');

  // Construct formats.
  const formatMonth = d3.utcFormat('%b');

  let title: undefined | ((i: number) => string);
  // Compute titles.
  if (title === undefined) {
    const formatDate = d3.utcFormat('%B %-d, %Y');
    const formatValue = color.tickFormat(100, null);
    title = (i: number) => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
  } else if (title !== null) {
    const T = d3.map(data, title);
    title = (i: number) => T[i];
  }

  // Group the index by year, in reverse input order. (Assuming that the input is
  // chronological, this will show years in reverse chronological order.)
  const years = d3.groups(I, (i: number) => X[i].getUTCFullYear()).reverse();

  function pathMonth(t: Date) {
    const d = Math.max(0, Math.min(weekDays, countDay(t.getUTCDay())));
    const w = timeWeek.count(d3.utcYear(t), t);
    return `${
      d === 0
        ? `M${w * cellSize},0`
        : d === weekDays
        ? `M${(w + 1) * cellSize},0`
        : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`
    }V${weekDays * cellSize}`;
  }

  const renderCalHeatmap = (
    svg: d3.Selection<SVGElement | null, unknown, null, undefined>
  ) => {
    const year = svg
      .selectAll('g')
      .data(years)
      .join('g')
      .attr(
        'transform',
        (_: any, i: number) => `translate(40.5,${height * i + cellSize * 1.5})`
      );

    year
      .append('text')
      .attr('x', -5)
      .attr('y', -5)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      .attr('stroke', '#fff')
      .attr('fill', '#fff')
      .text(([key]) => key);

    year
      .append('g')
      .attr('text-anchor', 'end')
      .selectAll('text')
      .data(d3.range(7))
      .join('text')
      .attr('x', -5)
      .attr('y', (i) => (countDay(i) + 0.5) * cellSize)
      .attr('dy', '0.31em')
      .attr('stroke', '#fff')
      .attr('fill', '#fff')
      .text(formatDay);

    const cell = year
      .append('g')
      .selectAll('rect')
      .data(([, I]) => I)
      .join('rect')
      .attr('width', cellSize - 1)
      .attr('height', cellSize - 1)
      .attr('x', (i) => timeWeek.count(d3.utcYear(X[i]), X[i]) * cellSize + 0.5)
      .attr('y', (i) => countDay(X[i].getUTCDay()) * cellSize + 0.5)
      .attr('fill', (i) => color(Y[i]));

    if (title) cell.append('title').text(title);

    const month = year
      .append('g')
      .selectAll('g')
      .data(([, I]) => d3.utcMonths(d3.utcMonth(X[I[0]]), X[I[I.length - 1]]))
      .join('g');

    month
      .filter((d, i) => i)
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .attr('d', pathMonth);

    month
      .append('text')
      .attr(
        'x',
        (d) => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2
      )
      .attr('y', -5)
      .attr('stroke', '#fff')
      .attr('fill', '#fff')
      .text(formatMonth);
  };

  const { ref } = useD3({
    renderFn: renderCalHeatmap,
    dependencies: [data.length],
  });

  return (
    <React.Fragment>
      <svg
        id="svg-container"
        width={'100%'}
        height={height * years.length}
        viewBox={`[0, 0, ${width}, ${height * years.length}]`}
        style={{
          maxWidth: '100%',
          height: 'auto',
          height: 'intrinsic',
          backgroundColor: 'black',
        }}
        fontFamily={'sans-serif'}
        fontSize={10}
        ref={ref}
      />
    </React.Fragment>
  );
};

export default CalendarHeatmap;
