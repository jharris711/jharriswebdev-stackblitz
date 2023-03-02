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
import CalendarHeatmap from './CalendarHeatmap';

interface CalendarHeatmapData {
  id: string;
  eventTimestamp: string;
  numEvents: number;
}

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

function D3Demos({ calendarHeatmapData }) {
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
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box>
            <CalendarHeatmap data={calendarHeatmapData} />
          </Box>
          <Box>
            <Divider />
            <Typography variant="h6">Data:</Typography>
            <Paper
              id="calendar-heatmap-json-display"
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
