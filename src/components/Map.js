import React, { Component } from 'react';

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

import Minimap from './Minimap';
import Logo from './Logo';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lat: props.centerLat,
      lng: props.centerLong,
      zoom: props.zoom,
    };

    this.showPreview = this.showPreview.bind(this);
  }

  showPreview() {
    this.props.setShowSite(!this.props.showSite);
  }

  render() {

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      iconAnchor: [12,41],
      iconSize: [25,41],
    });
    
    const tileUrl = 'https://api.mapbox.com/styles/v1/michellito/ckovvt6ba3qm418qr3dh0qwgz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGl0byIsImEiOiJja244YnR3aWYwN3ljMm5waWZpMHBlOXdmIn0.kqDL2Srx2HSgNODDENNJfg'
    const purpleOptions = { color: 'purple' };
    const polygon = [
      [34.501133, -112.252417],
      [34.500833, -112.252167],
      [34.500267, -112.252783],
      [34.500533, -112.253033]
    ]

    const siteIcon = L.icon({
      iconUrl: "marker-icon.png",
      iconSize: [24,36],
      iconAnchor: [12,36]
    });

    const replicates = [
      {latitude: 0, longitude: 1}
    ]

    return (

      <MapContainer 
          center={[this.state.lat, this.state.lng]} 
          zoom={this.state.zoom} 
          style={{ width: '100%', height: '100%'}}
          whenCreated={this.props.setMap}
      >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
        />
        <Marker
          position={[this.state.lat, this.state.lng]} 
          eventHandlers={{ click: () => this.showPreview() }}
          icon={siteIcon}
        >
          <Tooltip>Iron King</Tooltip>

        </Marker>
        {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}
        <Minimap position="topright" zoom="8"/>
        <Logo position="bottomleft"/>
      </MapContainer>    
    )
  }
}
