import React, { Component } from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,

} from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Minimap from './Minimap';
import Logo from './Logo';

export default class Map extends Component {

  constructor(props) {
    super(props);



    this.state = {
      sites: props.sites,
      zoom: props.zoom,
    };

    this.showPreview = this.showPreview.bind(this);
  }

  showPreview() {
    this.props.setShowSite(!this.props.showSite);
  }

  render() {

    console.log(this.props.sites)
    
    const tileUrl = 'https://api.mapbox.com/styles/v1/michellito/ckovvt6ba3qm418qr3dh0qwgz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGl0byIsImEiOiJja244YnR3aWYwN3ljMm5waWZpMHBlOXdmIn0.kqDL2Srx2HSgNODDENNJfg'

    const siteIcon = L.icon({
      iconUrl: "marker-icon.png",
      shadowUrl: "marker-shadow.png",
      iconSize: [24,36],
      iconAnchor: [12,36]
    });

    return (

      <MapContainer 
          center={[34.5011, -112.2524]} 
          zoom={this.state.zoom} 
          style={{ width: '100%', height: '100%'}}
          whenCreated={this.props.setMap}
      >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
        />

        { this.props.sites.map((site, i) => 
          <Marker
            key={i}
            position={[site.latitude, site.longitude]} 
            eventHandlers={{ click: () => this.showPreview(site.id) }}
            icon={siteIcon}
          >
            <Tooltip>Iron King</Tooltip>
          </Marker>
  
        )}

       

        {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}
        <Minimap position="topright" zoom={this.state.zoom <= 8 ? this.state.zoom * .6 : 8}/>
        <Logo position="bottomleft"/>

        {/* <SiteDetailLayer></SiteDetailLayer> */}
      </MapContainer>    
    )
  }
}
