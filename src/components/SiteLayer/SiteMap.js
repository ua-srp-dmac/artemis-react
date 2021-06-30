import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Tabs,
  Tab,
  Stack
} from 'grommet';

import { FormClose, FormSearch, Menu } from 'grommet-icons';
import React, { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  Polygon 
} from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function SiteMap(props) {
  
  const tileUrl = 'https://api.mapbox.com/styles/v1/michellito/ckovvt6ba3qm418qr3dh0qwgz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGl0byIsImEiOiJja244YnR3aWYwN3ljMm5waWZpMHBlOXdmIn0.kqDL2Srx2HSgNODDENNJfg'
  
  const siteIcon = L.icon({
    iconUrl: "marker-icon.png",
    iconSize: [24,36],
    iconAnchor: [12,36]
  });

  const purpleOptions = { color: 'purple' };
  const polygon = [
    [34.501133, -112.252417],
    [34.500833, -112.252167],
    [34.500267, -112.252783],
    [34.500533, -112.253033]
  ];

  return (
    <MapContainer 
          center={[34.501133, -112.252417]} 
          zoom={20} 
          style={{ width: '100%', height: '100%'}}
          // whenCreated={this.props.setMap}
      >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
        />
        {/* <Marker
          position={[34.501133, -112.252417]}    
          eventHandlers={{ click: () => this.showPreview() }}
          icon={siteIcon}
        >
          <Tooltip>Iron King</Tooltip>
        </Marker> */}
        <Polygon pathOptions={purpleOptions} positions={polygon} />
        {/* <Minimap position="topright" zoom="8"/> */}
      </MapContainer>
  );
}

export default SiteMap;