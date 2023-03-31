import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import pick from '@cahil/utils/accessors/pick';
import CalendarHeatmap from '../../components/CalendarHeatmap';
import HorizonChart from '../../components/HorizonChart';
import { CalendarHeatmapData, HorizonChartData } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

interface Props {
  calendarHeatmapData: CalendarHeatmapData[];
  horizonChartData: HorizonChartData[];
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

const D3Demos: React.FC<Props> = ({
  calendarHeatmapData,
  horizonChartData,
}) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Card sx={{ minWidth: '100%', height: '100%' /* overflow: `scroll` */ }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Calendar Heatmap" {...a11yProps(0)} />
          <Tab label="Horizon Chart" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box
            id="calendar-heatmap-box"
            sx={{
              // @ts-ignore
              padding: theme.spacing(1),
              maxHeight: '200px',
              overflow: 'scroll',
            }}
          >
            <CalendarHeatmap data={calendarHeatmapData} />
          </Box>
          <Divider />
          <Box id="calendar-heatmap-json-display-box">
            <Typography variant="h6">Data:</Typography>
            <Paper
              elevation={2}
              sx={{
                padding: theme.spacing(1),
                maxHeight: '250px',
                overflow: 'scroll',
              }}
            >
              <pre>
                <code>
                  {JSON.stringify(
                    calendarHeatmapData.map((data: CalendarHeatmapData) =>
                      pick(data, 'eventTimestamp', 'numEvents')
                    ),
                    null,
                    2
                  )}
                </code>
              </pre>
            </Paper>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box
            sx={{
              padding: theme.spacing(1),
              maxHeight: '200px',
              overflow: 'scroll',
            }}
          >
            <HorizonChart
              bands={3}
              colorScheme={'GnBu'}
              data={horizonChartData}
            />
          </Box>
          <Box>
            <Divider />
            <Typography variant="h6">Data:</Typography>
            <Paper
              id="horizon-chart-json-display"
              elevation={2}
              sx={{
                padding: theme.spacing(1),
                maxHeight: '250px',
                overflow: 'scroll',
              }}
            >
              <pre>
                <code>
                  {JSON.stringify(
                    horizonChartData.map((data: HorizonChartData) =>
                      pick(data, 'date', 'name', 'value')
                    ),
                    null,
                    2
                  )}
                </code>
              </pre>
            </Paper>
          </Box>
        </TabPanel>
      </Card>
    </React.Fragment>
  );
};

export default D3Demos;
