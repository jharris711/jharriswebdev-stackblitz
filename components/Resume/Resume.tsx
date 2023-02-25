import * as React from 'react';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';

function JobDesc({ employer, position, date, description }) {
  return (
    <React.Fragment>
      <Typography variant="h6" component="div">
        {employer}
      </Typography>
      <Typography variant="subtitle1">{position}</Typography>
      <Typography variant="subtitle2">{date}</Typography>
      <Typography variant="body2">{description}</Typography>
    </React.Fragment>
  );
}

function Resume() {
  return (
    <React.Fragment>
      <Card sx={{ minWidth: '100%', height: '100%', overflow: `scroll` }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Full Stack Developer
          </Typography>
          <Typography variant="h4" component="div">
            Joshua Harris
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            jharriswebdev@gmail.com
          </Typography>
          <JobDesc
            employer="Phoenix Operations Group"
            position="Full Stack Developer"
            date="08/2020 - 11/2022"
            description="Spearheaded the design and development of cutting-edge
      geospatial analytic (GIS) software applications for government
      clients, leading the UI/UX design and development efforts."
          />
          <br />
          <JobDesc
            employer="H2 Collective"
            position="Web Developer"
            date="010/2017 - 08/2020"
            description="Successfully established a strong online presence for the brand, leveraging expertise in web development and design to create engaging and visually appealing websites."
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href="https://www.linkedin.com/in/joshsharris/"
            target="_blank"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default Resume;
