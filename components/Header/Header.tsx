import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';

function Header() {
  return (
    <React.Fragment>
      <Card
        variant="outlined"
        sx={{
          borderColor: `rgba(0,0,0,0)`,
          height: '100%',
        }}
      >
        <CardContent>
          <Typography variant="h1" color="text.secondary">
            <strong>J. Harris</strong>
          </Typography>
          <Typography variant="h5" component="div">
            Web &#38; Software Developer
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            sx={{ color: (theme: Theme) => theme.palette.text.secondary }}
            href="https://www.linkedin.com/in/joshsharris/"
            target="_blank"
          >
            linkedin
          </Button>
          <Button
            size="small"
            href="https://github.com/jharris711"
            target="_blank"
            sx={{ color: (theme: Theme) => theme.palette.text.secondary }}
          >
            github
          </Button>
          <Button
            size="small"
            href="https://jharriswebdev.medium.com/"
            target="_blank"
            sx={{ color: (theme: Theme) => theme.palette.text.secondary }}
          >
            blogs
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default Header;
