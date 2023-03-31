import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { phoenixOps, h2, JobDescription } from './descriptions';

interface JobDutiesProps {
  employer: string;
  position: string;
  date: string;
  description: JobDescription;
}

const JobDuties: React.FC<JobDutiesProps> = ({
  employer,
  position,
  date,
  description,
}) => {
  const matches = useMediaQuery('(min-width:675px)');
  return (
    <React.Fragment>
      <Typography variant="h6" component="div">
        {employer}
      </Typography>
      <Typography variant="subtitle1">{position}</Typography>
      <Typography variant="subtitle2">{date}</Typography>
      {matches ? (
        <React.Fragment>
          <List dense>
            {description.long.map((bulletPoint: string) => (
              <ListItem dense>{bulletPoint}</ListItem>
            ))}
          </List>
        </React.Fragment>
      ) : (
        <Typography variant="body2">{description.short}</Typography>
      )}
    </React.Fragment>
  );
};

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
          <JobDuties
            employer="Phoenix Operations Group"
            position="Full Stack Developer"
            date="08/2020 - 11/2022"
            description={phoenixOps}
          />
          <br />
          <JobDuties
            employer="H2 Collective"
            position="Web Developer"
            date="010/2017 - 08/2020"
            description={h2}
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
