import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Tabs,
  Tab,
  Stack,
  Select
} from 'grommet';

import { FormClose, FormSearch, Menu } from 'grommet-icons';
import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import {
  MapContainer,
  TileLayer,
  LayerGroup,
  Marker,
  Tooltip,
  useMap,
  Polygon ,
  CircleMarker,
  Popup
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
  const redOptions = { color: 'red' };

  const polygon = [
    [34.501133, -112.252417],
    [34.500833, -112.252167],
    [34.500267, -112.252783],
    [34.500533, -112.253033]
  ];

  const replicates = [
    { replicate: 1, plot:	1, lat: 34.501100, long: -112.252450, treatment: 'control', pH:	2.54, pHCa: 2.47, EC:	9.21, treatmentId: 6 },
    { replicate: 2, plot:	1, lat: 34.501033, long: -112.252417, treatment: 'control', pH:	2.37, pHCa: 2.34, EC:	9.25,	treatmentId: 6 },
    { replicate: 3, plot:	1, lat: 34.501033, long: -112.252500, treatment: 'control', pH:	2.51, pHCa: 2.50, EC:	7.82,	treatmentId: 6 },
    { replicate: 1, plot:	2, lat: 34.501017, long: -112.252333, treatment: 'control', pH:	2.56, pHCa: 2.46, EC:	8.38,	treatmentId: 6 },
    { replicate: 2, plot:	2, lat: 34.500983, long: -112.252350, treatment: 'control', pH:	2.50, pHCa: 2.44, EC:	9.98,	treatmentId: 6 },
    { replicate: 3, plot:	2, lat: 34.500967, long: -112.252400, treatment: 'control', pH:	2.52, pHCa: 2.45, EC:	9.79,	treatmentId: 6 },
    { replicate: 1, plot:	3, lat: 34.500967, long: -112.252283, treatment: '10% comp seed',	pH:	6.18,	pHCa: 6.38,	EC:	8.57, treatmentId:	5 },
    { replicate: 2, plot:	3, lat: 34.500917, long: -112.252283, treatment: '10% comp seed',	pH:	6.11,	pHCa: 6.28,	EC:	12.16, treatmentId:	5 },
    { replicate: 3, plot:	3, lat: 34.500917, long: -112.252350, treatment: '10% comp seed',	pH:	5.45,	pHCa: 5.42,	EC:	2.24, treatmentId:	5 },
    { replicate: 1, plot:	4, lat: 34.500900, long: -112.252217, treatment: '15% comp', pH: 5.21, pHCa: 5.00, EC: 10.06, treatmentId:	2 },
    { replicate: 2, plot:	4, lat: 34.500850, long: -112.252200, treatment: '15% comp', pH: 6.08, pHCa: 6.21, EC: 12.31, treatmentId:	2 },
    { replicate: 3, plot:	4, lat: 34.500850, long: -112.252250, treatment: '15% comp', pH: 5.71, pHCa: 6.01, EC: 10.78, treatmentId:	2 },
    { replicate: 1, plot:	5, lat: 34.500767, long: -112.252283, treatment: '15% comp seed', pH:	4.35, pHCa:	4.22, EC:	6.55, treatmentId: 1 },
    { replicate: 2, plot:	5, lat: 34.500767, long: -112.252350, treatment: '15% comp seed', pH:	7.08, pHCa:	7.13, EC:	14.62, treatmentId:	1 },
    { replicate: 3, plot:	5, lat: 34.500717, long: -112.252333, treatment: '15% comp seed', pH:	7.49, pHCa:	7.47, EC:	15.50, treatmentId:	1 },
    { replicate: 1, plot:	6, lat: 34.500850, long: -112.252350, treatment: '20% comp seed', pH:	7.08, pHCa:	7.12, EC:	15.58, treatmentId:	3 },
    { replicate: 2, plot:	6, lat: 34.500833, long: -112.252433, treatment: '20% comp seed', pH:	7.45, pHCa:	7.37, EC:	5.37, treatmentId:	3 },
    { replicate: 3, plot:	6, lat: 34.500800, long: -112.252433, treatment: '20% comp seed', pH:	7.53, pHCa:	7.52, EC:	12.04, treatmentId:	3 },
    { replicate: 1, plot:	7, lat: 34.500900, long: -112.252433, treatment: '20% comp', pH: 7.11, pHCa: 7.17, EC: 18.12, treatmentId: 4 },
    { replicate: 2, plot:	7, lat: 34.500900, long: -112.252500, treatment: '20% comp', pH: 7.03, pHCa: 7.11, EC: 12.81, treatmentId: 4 },
    { replicate: 3, plot:	7, lat: 34.500867, long: -112.252500, treatment: '20% comp', pH: 7.53, pHCa: 7.49, EC: 19.25, treatmentId: 4 },
    { replicate: 1, plot:	8, lat: 34.500950, long: -112.252500, treatment: '20% comp seed', pH:	7.74, pHCa:	7.70, EC:	14.05, treatmentId:	3 },
    { replicate: 2, plot:	8, lat: 34.500950, long: -112.252567, treatment: '20% comp seed', pH:	7.36, pHCa:	7.38, EC:	23.94, treatmentId:	3 },
    { replicate: 3, plot:	8, lat: 34.500900, long: -112.252567, treatment: '20% comp seed', pH:	6.38, pHCa:	6.51, EC:	16.33, treatmentId:	3 },
    { replicate: 1, plot:	9, lat: 34.500883, long: -112.252650, treatment: '15% comp', pH: 6.10, pHCa: 6.26, EC: 7.55, treatmentId:	2 },
    { replicate: 2, plot:	9, lat: 34.500817, long: -112.252650, treatment: '15% comp', pH: 6.69, pHCa: 6.82, EC: 11.74, treatmentId:	2 },
    { replicate: 3, plot:	9, lat: 34.500833, long: -112.252717, treatment: '15% comp', pH: 6.11, pHCa: 6.10, EC: 9.15, treatmentId:	2 },
    { replicate: 1, plot:	10, lat: 	34.500817, long: -112.252583, treatment: '15% comp seed', pH:	7.65, pHCa:	7.55, EC:	8.47, treatmentId:	1 },
    { replicate: 2, plot:	10, lat: 	34.500767, long: -112.252567, treatment: '15% comp seed', pH:	6.99, pHCa:	7.08, EC:	20.67, treatmentId:	1 },
    { replicate: 3, plot:	10, lat: 	34.500767, long: -112.252617, treatment: '15% comp seed', pH:	6.24, pHCa:	6.38, EC:	12.52, treatmentId:	1 },
    { replicate: 1, plot:	11, lat: 	34.500767, long: -112.252500, treatment: '20% comp', pH: 7.04, pHCa: 7.09, EC: 16.72, treatmentId: 4 },
    { replicate: 2, plot:	11, lat: 	34.500717, long: -112.252533, treatment: '20% comp', pH: 4.60, pHCa: 4.63, EC: 11.04, treatmentId: 4 },
    { replicate: 3, plot:	11, lat: 	34.500717, long: -112.252517, treatment: '20% comp', pH: 7.47, pHCa: 7.53, EC: 25.22, treatmentId: 4 },
    { replicate: 1, plot:	12, lat: 	34.500683, long: -112.252417, treatment: '10% comp seed',	pH: 7.44, pHCa:	7.43, EC:	21.95, treatmentId:	5 },
    { replicate: 2, plot:	12, lat: 	34.500667, long: -112.252433, treatment: '10% comp seed',	pH: 6.87, pHCa:	6.94, EC:	23.35, treatmentId:	5 },
    { replicate: 3, plot:	12, lat: 	34.500667, long: -112.252467, treatment: '10% comp seed',	pH: 5.90, pHCa:	6.05, EC:	11.69, treatmentId:	5 },
    { replicate: 1, plot:	13, lat: 	34.500583, long: -112.252483, treatment: '20% comp', pH: 8.05, pHCa: 8.03, EC: 23.45, treatmentId: 4 },
    { replicate: 2, plot:	13, lat: 	34.500583, long: -112.252533, treatment: '20% comp', pH: 6.68, pHCa: 6.61, EC: 15.92, treatmentId: 4 },
    { replicate: 3, plot:	13, lat: 	34.500500, long: -112.252550, treatment: '20% comp', pH: 7.87, pHCa: 7.90, EC: 22.18, treatmentId: 4 },
    { replicate: 1, plot:	14, lat: 	34.500583, long: -112.252633, treatment: '15% comp', pH: 5.30, pHCa: 5.25, EC: 13.01, treatmentId:	2 },
    { replicate: 2, plot:	14, lat: 	34.500633, long: -112.252617, treatment: '15% comp', pH: 7.03, pHCa: 7.09, EC: 25.23, treatmentId:	2 },
    { replicate: 3, plot:	14, lat: 	34.500633, long: -112.252567, treatment: '15% comp', pH: 4.47, pHCa: 4.38, EC: 13.05, treatmentId:	2 },
    { replicate: 1, plot:	15, lat: 	34.500700, long: -112.252650, treatment: '20% comp seed', pH:	6.93, pHCa:	7.06, EC:	6.45, treatmentId:	3 },
    { replicate: 2, plot:	15, lat: 	34.500717, long: -112.252717, treatment: '20% comp seed', pH:	7.09, pHCa:	7.15, EC:	19.55, treatmentId:	3 },
    { replicate: 3, plot:	15, lat: 	34.500650, long: -112.252683, treatment: '20% comp seed', pH:	6.51, pHCa:	6.76, EC:	8.36, treatmentId:	3 },
    { replicate: 1, plot:	16, lat: 	34.500650, long: -112.252700, treatment: '20% comp', pH: 4.84, pHCa: 5.08, EC: 11.02, treatmentId: 4 },
    { replicate: 2, plot:	16, lat: 	34.500733, long: -112.252800, treatment: '20% comp', pH: 8.76, pHCa: 8.66, EC: 11.00, treatmentId: 4 },
    { replicate: 3, plot:	16, lat: 	34.500667, long: -112.252783, treatment: '20% comp', pH: 7.41, pHCa: 7.32, EC: 19.30, treatmentId: 4 },
    { replicate: 1, plot:	17, lat: 	34.500667, long: -112.252883, treatment: '10% comp seed',	pH: 6.61, pHCa:	6.73, EC:	12.09, treatmentId:	5 },
    { replicate: 2, plot:	17, lat: 	34.500617, long: -112.252867, treatment: '10% comp seed',	pH: 2.82, pHCa:	2.56, EC:	8.60, treatmentId:	5 },
    { replicate: 3, plot:	17, lat: 	34.500617, long: -112.252917, treatment: '10% comp seed',	pH: 6.49, pHCa:	6.60, EC:	15.23, treatmentId:	5 },
    { replicate: 1, plot:	18, lat: 	34.500617, long: -112.252800, treatment: '10% comp seed',	pH: 4.37, pHCa:	4.22, EC:	10.32, treatmentId:	5 },
    { replicate: 2, plot:	18, lat: 	34.500550, long: -112.252783, treatment: '10% comp seed',	pH: 6.26, pHCa:	6.41, EC:	9.68, treatmentId:	5 },
    { replicate: 3, plot:	18, lat: 	34.500550, long: -112.252867, treatment: '10% comp seed',	pH: 6.70, pHCa:	6.87, EC:	9.45, treatmentId:	5 },
    { replicate: 1, plot:	19, lat: 	34.500550, long: -112.252717, treatment: '15% comp seed', pH:	7.57, pHCa:	7.53, EC:	22.55, treatmentId:	1 },
    { replicate: 2, plot:	19, lat: 	34.500500, long: -112.252700, treatment: '15% comp seed', pH:	6.63, pHCa:	6.69, EC:	14.05, treatmentId:	1 },
    { replicate: 3, plot:	19, lat: 	34.500517, long: -112.252767, treatment: '15% comp seed', pH:	3.79, pHCa:	4.05, EC:	8.53, treatmentId:	1 },
    { replicate: 1, plot:	20, lat: 	34.500500, long: -112.252650, treatment: '20% comp seed', pH:	8.11, pHCa:	7.97, EC:	8.61, treatmentId:	3 },
    { replicate: 2, plot:	20, lat: 	34.500450, long: -112.252633, treatment: '20% comp seed', pH:	7.63, pHCa:	7.60, EC:	24.50, treatmentId:	3 },
    { replicate: 3, plot:	20, lat: 	34.500433, long: -112.252683, treatment: '20% comp seed', pH:	7.12, pHCa:	7.18, EC:	22.98, treatmentId:	3 },
    { replicate: 1, plot:	21, lat: 	34.500367, long: -112.252717, treatment: 'control', pH:	2.44, pHCa: 2.39, EC:	8.85, treatmentId:	6 },
    { replicate: 2, plot:	21, lat: 	34.500350, long: -112.252767, treatment: 'control', pH:	2.37, pHCa: 2.33, EC:	7.60, treatmentId:	6 },
    { replicate: 3, plot:	21, lat: 	34.500317, long: -112.252783, treatment: 'control', pH:	2.47, pHCa: 2.36, EC:	4.95, treatmentId:	6 },
    { replicate: 1, plot:	22, lat: 	34.500417, long: -112.252800, treatment: 'control', pH:	2.42, pHCa: 2.35, EC:	9.36, treatmentId:	6 },
    { replicate: 2, plot:	22, lat: 	34.500417, long: -112.252883, treatment: 'control', pH:	2.62, pHCa: 2.50, EC:	5.30, treatmentId:	6 },
    { replicate: 3, plot:	22, lat: 	34.500367, long: -112.252850, treatment: 'control', pH:	2.44, pHCa: 2.42, EC:	10.49, treatmentId:	6 },
    { replicate: 1, plot:	23, lat: 	34.500483, long: -112.252883, treatment: '15% comp', pH: 6.30, pHCa: 6.47, EC: 18.93, treatmentId:	2 },
    { replicate: 2, plot:	23, lat: 	34.500483, long: -112.252917, treatment: '15% comp', pH: 6.85, pHCa: 7.10, EC: 22.44, treatmentId:	2 },
    { replicate: 3, plot:	23, lat: 	34.500450, long: -112.252900, treatment: '15% comp', pH: 6.33, pHCa: 6.36, EC: 16.72, treatmentId:	2 },
    { replicate: 1, plot:	24, lat: 	34.500550, long: -112.252933, treatment: '15% comp seed', pH:	5.98, pHCa:	6.54, EC:	16.56, treatmentId:	1 },
    { replicate: 2, plot:	24, lat: 	34.500533, long: -112.252983, treatment: '15% comp seed', pH:	4.63, pHCa:	5.09, EC:	11.33, treatmentId:	1 },
    { replicate: 3, plot:	24, lat: 	34.500483, long: -112.252967, treatment: '15% comp seed', pH:	4.58, pHCa:	4.99, EC:	7.83, treatmentId:	1 },
  ]

  function renderColor(param) {
    switch(param) {
      case 'control':
        return 'purple';
      case '10% comp seed':
        return '#A2423D';
      case '15% comp':
        return '#3D138D';
      case '15% comp seed':
        return '#00873D';
      case '20% comp':
        return '#FFCA58';
      case '20% comp seed':
        return '#00739D';
      default:
        return 'purple';
    };
  }

  function D3Layer() {
    const map = useMap();

    console.log(map)

    useEffect(() => {

      console.log(replicates);
      const svg = d3.select(map.getPanes().overlayPane).append("svg");

      console.log(svg)

      replicates.forEach(function(d){
        if (d.lat && d.long) {
          // console.log(d)
          d.latlng = new L.LatLng(d.lat, d.long);
        }
      });

      console.log(replicates)
      // const g = svg.append("g").attr("class", "leaflet-zoom-hide");

      var feature = svg.append('g')
        .attr("class", "leaflet-zoom-hide")
        .selectAll('circle')
        .data(replicates)
        .enter()
        .append('circle')
        .style('opacity', .8)
        .style('fill',function(d){
            // var x = d3.scaleLinear().domain([1,5]).range([1,0]);
            // return d3.interpolateViridis(x(d.rating))
            return 'red';
        })  
        .attr('r',3)
        // .on("mouseover", handleMouseOver)
        // .on("mouseout", handleMouseOut)

      reset();

      function reset(){
        feature.attr('transform',function(d){
          d.x = map.latLngToLayerPoint(d.latlng).x;
          d.y = map.latLngToLayerPoint(d.latlng).y;
          return 'translate('+ map.latLngToLayerPoint(d.latlng).x +","+ map.latLngToLayerPoint(d.latlng).y +")";
        });
        console.log('reset')
      }
    }, []);
    return null;
  }

  return (
    <>
    <MapContainer 
          center={[34.500717, -112.252517]} 
          zoom={20} 
          // style={{ width: '18.75em', height: '18.75em'}}
          style={{ 'minWidth': '18.75em', 'minHeight': '29.75em'}}
          // whenCreated={this.props.setMap}
      >
        {/* <LayerGroup>
          <D3Layer />
        </LayerGroup> */}

        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
        />
        
        { replicates.map((replicate, i) =>
    
          <CircleMarker
            key={i}
            center={[replicate.lat, replicate.long]}
            pathOptions={
              {
                color: renderColor(replicate.treatment),
                weight: 1.5,
                fillColor: renderColor(replicate.treatment),
                fillOpacity: .5 
              }
            }
            radius={3.5}
          >
            <Tooltip>
              Plot {replicate.plot} <br></br>
              Replicate {replicate.replicate}<br></br>
              {replicate.treatment}
            </Tooltip>
          </CircleMarker>
        )}
       
        {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}
        {/* <Minimap position="topright" zoom="8"/> */}
      </MapContainer>
      {/* <Select
        options={['treatment', 'pH', 'pHCa', 'EC']}
        value={value}
        onChange={({ option }) => setValue(option)}
      /> */}
      </>
      
  );
}

export default SiteMap;