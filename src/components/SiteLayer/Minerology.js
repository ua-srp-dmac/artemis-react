import React from 'react';
import Plot from 'react-plotly.js';

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

export default class Minerology extends React.Component {
  
  
  render() {
    const quartz = [
      {
        x: ['0-5', '5-15', '15-25', '25-35', '35-38', '38-54', '180-183'],
        y: [41.3, 49.3, 38, 53.6, 35.9, 42.7, 31.4],
        type: 'bar',
        marker: {
          color: 'rgb(158,202,225)',
          opacity: 0.6,
          line: {
            color: 'rgb(8,48,107)',
            width: 1.5
          }
        }
      },
    ];

    const plagioclase = [
      {
        x: ['0-5', '5-15', '15-25', '25-35', '35-38', '38-54', '180-183'],
        y: [2.8, 3.3, 1.3, 9.1, 4.2, 3.3, 2.3],
        type: 'bar',
        marker: {
          color: 'rgb(158,202,225)',
          opacity: 0.6,
          line: {
            color: 'rgb(8,48,107)',
            width: 1.5
          }
        }
      },
    ];

    return (
      <>
      <Plot
        data={quartz}
        layout={{
          width: 500,
          height: 350,
          title: 'Quartz',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          xaxis: {title: 'Depth (cm)'},
           
        }}
      />
      <Plot
        data={plagioclase}
        layout={{
          width: 500,
          height: 350,
          title: 'Plagioclase',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          xaxis: {title: 'Depth (cm)'},
           
        }}
      />
      </>
    );
  }
}