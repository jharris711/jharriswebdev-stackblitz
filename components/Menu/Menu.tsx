import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CardActions from '@mui/material/CardActions';
import { Theme } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setActiveButton } from './menuSlice';

function Menu() {
  const { activeButton } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          width: '100%',
          borderColor: `rgba(0,0,0,0)`,
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <CardActions>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="outlined"
            size="large"
            color="inherit"
          >
            <Button
              sx={{
                width: '100%',
                color: (theme: Theme) =>
                  activeButton === 'leaflet'
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                backgroundColor: (theme: Theme) =>
                  activeButton === 'leaflet'
                    ? theme.palette.action.selected
                    : '',
              }}
              onClick={(e: React.SyntheticEvent) =>
                dispatch(setActiveButton((e.target as HTMLButtonElement).value))
              }
              value="leaflet"
            >
              leaflet
            </Button>
            {/* <Button
              sx={{
                width: '100%',
                color: (theme: Theme) =>
                  activeButton === 'openai'
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                backgroundColor: (theme: Theme) =>
                  activeButton === 'openai'
                    ? theme.palette.action.selected
                    : '',
              }}
              onClick={(e: React.SyntheticEvent) =>
                dispatch(setActiveButton((e.target as HTMLButtonElement).value))
              }
              value="openai"
            >
              OpenAI
            </Button> */}
            <Button
              sx={{
                width: '100%',
                color: (theme: Theme) =>
                  activeButton === 'd3'
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                backgroundColor: (theme: Theme) =>
                  activeButton === 'd3' ? theme.palette.action.selected : '',
              }}
              onClick={(e: React.SyntheticEvent) =>
                dispatch(setActiveButton((e.target as HTMLButtonElement).value))
              }
              value="d3"
            >
              d3
            </Button>
            <Button
              sx={{
                width: '100%',
                color: (theme: Theme) =>
                  activeButton === 'resume'
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                backgroundColor: (theme: Theme) =>
                  activeButton === 'resume'
                    ? theme.palette.action.selected
                    : '',
              }}
              onClick={(e: React.SyntheticEvent) =>
                dispatch(setActiveButton((e.target as HTMLButtonElement).value))
              }
              value="resume"
            >
              Résumé
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default Menu;
