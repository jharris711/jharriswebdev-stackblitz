import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

/* - Lead the UI/UX design and development of geospatial analytic (GIS) software applications for government clients.
- Utilized React, Redux, Node, and other modern JavaScript technologies to create unique user interfaces.
- Developed custom panel plugins for Grafana dashboards using a D3, React, and Typescript.
- Created RESTful APIs and backends with frameworks like Flask and Swagger.
- Collaborated with developer and management teams using SCRUM/Agile Methodology via the Atlassian Suite (JIRA, Confluence, Bitbucket, etc). */

interface JobDescription {
  short: string;
  long: string[];
}

const phoenixOps: JobDescription = {
  short:
    'Spearheaded the design and development of cutting-edge geospatial analytic (GIS) software applications for government clients, leading the UI/UX design and development efforts',
  long: [
    '- Designed and developed UI/UX of GIS software for government clients',
    '- Utilized React, Redux, Node, and other modern JavaScript technologies',
    '- Developed panel plugins for Grafana dashboards using a D3, React, and Typescript',
    '- Created RESTful APIs and backends with frameworks like Flask and Swagger',
    '- Collaborated with dev and mgmt teams using SCRUM/Agile Methodology via the Atlassian Suite (JIRA, Confluence, Bitbucket, etc)',
  ],
};

const h2: JobDescription = {
  short:
    'Successfully established a strong online presence for the brand, leveraging expertise in web development and design to create engaging and visually appealing websites.',
  long: [
    '- Established the brand’s online presence by creating and maintaining the first company site with React/ Netlify, then WordPress',
    '- Increased revenue from event bookings by creating websites for each individual restaurant entity',
  ],
};

function JobDesc({ employer, position, date, description }) {
  const matches = useMediaQuery('(min-width:600px)');
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
              <ListItem>{bulletPoint}</ListItem>
            ))}
          </List>
        </React.Fragment>
      ) : (
        <Typography variant="body2">{description.short}</Typography>
      )}
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
            description={phoenixOps}
          />
          <br />
          <JobDesc
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
