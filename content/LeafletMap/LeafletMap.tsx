import * as React from 'react';
import Card from '@mui/material/Card';
import * as L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeomanControl from '../../components/GeomanControl';
import LocateControl from '../../components/LocateControl';
import RoutingMachineControl from '../../components/RoutingMachineControl';

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
