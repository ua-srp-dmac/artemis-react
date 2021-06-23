import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MiniMap from 'leaflet-minimap';
import 'leaflet/dist/leaflet.css';


export default class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lat: 34.501133,
      lng: -112.252417,
      zoom: 14.5,
    };
  }

  componentDidMount() {

    let tileURL = 'https://api.mapbox.com/styles/v1/michellito/ckovvt6ba3qm418qr3dh0qwgz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGl0byIsImEiOiJja244YnR3aWYwN3ljMm5waWZpMHBlOXdmIn0.kqDL2Srx2HSgNODDENNJfg'

    this.map = L.map('map', {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer(tileURL, {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });

    // if (this.map != undefined) { this.map.remove(); }

    // this.map = L.map('map').setView([34.501133,-112.252417], 14.5);
    // let tileURL = 'https://api.mapbox.com/styles/v1/michellito/ckovvt6ba3qm418qr3dh0qwgz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGl0byIsImEiOiJja244YnR3aWYwN3ljMm5waWZpMHBlOXdmIn0.kqDL2Srx2HSgNODDENNJfg'

    // let tilelayer = L.tileLayer(tileURL, {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     maxZoom: 15,
    // }).addTo(this.map);

    // L.svg({clickable:true}).addTo(this.map)
  }

  render() {

    const tileUrl = 'https://api.mapbox.com/styles/v1/michellito/ckovvt6ba3qm418qr3dh0qwgz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGl0byIsImEiOiJja244YnR3aWYwN3ljMm5waWZpMHBlOXdmIn0.kqDL2Srx2HSgNODDENNJfg'
    
    return (
      <div id="map"></div>
      // <MapContainer 
      //     center={[this.state.lat, this.state.lng]} 
      //     zoom={this.state.zoom} 
      //     style={{ width: '100%', height: '100%'}}
      // >
      //   <TileLayer
      //     attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //     url={tileUrl}
      //   />
      // </MapContainer>    
    )
  }
}
