import * as React from 'react';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';
import Header from './components/Header';
import Menu from './components/Menu';
import Resume from './content/Resume';
import LeafletMap from './content/LeafletMap';
import D3Demos from './content/D3Demos';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {
  useGetCalendarHeatmapDataQuery,
  useGetHorizonChartDataQuery,
} from './services/d3Data';
import './style.css';

export default function App() {
  const { activeButton } = useAppSelector((state) => state.menu);
  const {
    data: calendarHeatmapData,
    error: calendarHeatmapError,
    isLoading: calendarHeatmapLoading,
  } = useGetCalendarHeatmapDataQuery('');
  const {
    data: horizonChartData,
    error: horizonChartError,
    isLoading: horizonChartLoading,
  } = useGetHorizonChartDataQuery('');

  return (
    <Box
      id="grid-container"
      sx={{
        display: `grid`,
        gap: `10px`,
        gridTemplateColumns: `repeat(3, 1fr)`,
        gridTemplateRows: `1fr 3fr`,
        height: `100vh`,
        width: '100%',
        padding: `40px`,
        overflow: `hidden`,
        backgroundColor: (theme: Theme) => theme.palette.background.default,
      }}
    >
      <Box
        id="header-column"
        sx={{
          gridColumn: `1 / span 3`,
          gridRow: 1,
          height: '250px',
          width: '100%',
        }}
      >
        <Header />
      </Box>
      <Box
        id="menu-column"
        sx={{
          gridColumn: `1`,
          display: 'block',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Menu />
      </Box>
      <Box
        id="content-column"
        sx={{
          gridColumn: `2 / span 2`,
          overflow: 'hidden',
        }}
      >
        {activeButton === 'leaflet' ? (
          <LeafletMap />
        ) : activeButton === 'd3' ? (
          <D3Demos
            calendarHeatmapData={calendarHeatmapData}
            horizonChartData={horizonChartData}
          />
        ) : activeButton === 'resume' ? (
          <Resume />
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Box>
    </Box>
  );
}
