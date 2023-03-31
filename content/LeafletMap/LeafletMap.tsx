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
import * as L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from 'react-leaflet';
import { createControlComponent } from '@react-leaflet/core';
import { RoutingMachineControl, LocateControl } from './controls';
import GeomanControl from '../../components/GeomanControl';

function LeafletMap() {
  React.useEffect(() => {
    const styles = `
      .routing-machine-container {
        background-color: #121212;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);

    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Card sx={{ minWidth: '100%', height: '100%', overflow: `scroll` }}>
        <MapContainer
          center={[38.9072, -77.0369]}
          zoom={8}
          zoomControl={false}
          style={{ height: '100vh', width: '100%', padding: 0 }}
          whenReady={() => {}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RoutingMachineControl
            position={'topleft'}
            waypoints={[
              L.latLng(38.9072, -77.036),
              L.latLng(37.7749, -122.4194),
            ]}
            lineOptions={{
              styles: [
                {
                  color: '#757de8',
                },
              ],
            }}
            containerClassName="routing-machine-container"
          />
          <LocateControl position="topright" />
          <GeomanControl
            position="topright"
            drawCircle={false}
            oneBlock={true}
          />
        </MapContainer>
      </Card>
    </React.Fragment>
  );
}

export default LeafletMap;
