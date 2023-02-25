import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

declare var L: any;

interface P extends L.ControlOptions {
  waypoints: { lat: number; lng: number }[];
  lineOptions: Record<string, any>;
  containerClassName: string;
}

function createRoutineMachineInstance(props: P) {
  const instance = L.Routing.control(props);

  return instance;
}

export const RoutingMachineControl = createControlComponent(
  createRoutineMachineInstance
);
