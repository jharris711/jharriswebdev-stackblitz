import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as d3 from 'd3';
import { useD3 } from '../../hooks';
import { useGetCalendarHeatmapDataQuery } from '../../services/d3Data';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function D3Demos() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { data, error, isLoading } = useGetCalendarHeatmapDataQuery('');

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const cellSize = 20;
  const width = 928;
  const x = (d) => new Date(d.eventTimestamp);
  const y = (d) => d.numEvents;
  /**
   * d3-scale-chromatic color schemes
   * @see https://observablehq.com/@d3/color-schemes
   */
  const colors = d3.interpolatePiYG;
  const countDay = (i) => i;
  const timeWeek = d3.utcSunday;
  const weekDays = 7;
  const height = cellSize * (weekDays + 2);
  const formatDay = (i) => 'SMTWTFS'[i];

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

  let title;
  // Compute titles.
  if (title === undefined) {
    const formatDate = d3.utcFormat('%B %-d, %Y');
    const formatValue = color.tickFormat(100, null);
    title = (i) => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
  } else if (title !== null) {
    const T = d3.map(data, title);
    title = (i) => T[i];
  }

  // Group the index by year, in reverse input order. (Assuming that the input is
  // chronological, this will show years in reverse chronological order.)
  const years = d3.groups(I, (i) => X[i].getUTCFullYear()).reverse();

  function pathMonth(t) {
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

  const renderCalHeatmap = (svg) => {
    const year = svg
      .selectAll('g')
      .data(years)
      .join('g')
      .attr(
        'transform',
        (_, i) => `translate(40.5,${height * i + cellSize * 1.5})`
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

  /* const { ref } = useD3({
    renderFn: renderCalHeatmap,
    dependencies: [data.length],
  }); */

  return (
    <React.Fragment>
      <Card sx={{ minWidth: '100%', height: '100%', overflow: `scroll` }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* <svg
            id="svg=container"
            width={'100%'}
            height={height * years.length}
            viewBox={[0, 0, width, height * years.length]}
            style={{
              maxWidth: '100%',
              height: 'auto',
              height: 'intrinsic',
              backgroundColor: 'black',
            }}
            fontFamily={'sans-serif'}
            fontSize={10}
            ref={ref}
          /> */}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </Card>
    </React.Fragment>
  );
}

export default D3Demos;
