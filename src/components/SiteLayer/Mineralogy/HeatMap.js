import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import classNames from 'classnames';

import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Tabs,
  Card,
  Heading,
  Select,
  ResponsiveContext,
} from 'grommet';

import {
  Add,
  Edit,
  BarChart
} from 'grommet-icons';

export default function BarChartPlot(props) {


  // time 0 depth ranges
  const depths0 = [
    '0-5',
    '5-15',
    '15-25',
    '25-35',
    '35-38',
    '38-54',
    '180-183'
  ];
  
  // time 1 depth ranges
  const depths1 = [
    '0-20',
    '20-40',
    '40-60',
    '60-90'
  ];
  
  var mineralAmounts = {
    'quartz': {
      '0-5': 41.3,
      '5-15': 49.3,
      '15-25': 38,
      '25-35': 53.6,
      '35-38': 35.9,
      '38-54': 42.7,
      '180-183': 31.4
    },
    'plagioclase': {
      '0-5': 2.8,
      '5-15': 3.3,
      '15-25': 1.3,
      '25-35': 9.1,
      '35-38': 4.2,
      '38-54': 3.3,
      '180-183': 2.3
    },
    'illite': {
      '0-5': 0,
      '5-15': 0,
      '15-25': 6.8,
      '25-35': 0,
      '35-38': 8.2,
      '38-54': 10.4,
      '180-183': 12.1
    },
    'chlorite': {
      '0-5': 4.8,
      '5-15': 8.7,
      '15-25': 20.4,
      '25-35': 0,
      '35-38': 18.6,
      '38-54': 7.2,
      '180-183': 21.6
    },
    'kaolinite': {
      '0-5': 2.9,
      '5-15': 3.8,
      '15-25': 3.7,
      '25-35': 2.9,
      '35-38': 1.2,
      '38-54': 1.2,
      '180-183': 0.5
    },
    'pyrite': {
      '0-5': 2,
      '5-15': 1.4,
      '15-25': 10.8,
      '25-35': 21.3,
      '35-38': 17.4,
      '38-54': 18.2,
      '180-183': 18.1
    },
    'gypsum': {
      '0-5': 15.9,
      '5-15': 19.5,
      '15-25': 17,
      '25-35': 11.3,
      '35-38': 11.6,
      '38-54': 7.2,
      '180-183': 0
    },
    'jarosite': {
      '0-5': 30.3,
      '5-15': 14.1,
      '15-25': 0,
      '25-35': 0,
      '35-38': 0,
      '38-54': 0,
      '180-183': 0
    },
    'melanternite': {
      '0-5': 0,
      '5-15': 0,
      '15-25': 2.1,
      '25-35': 0,
      '35-38': 0,
      '38-54': 0,
      '180-183': 0
    },
    'ankerite': {
      '0-5': 0,
      '5-15': 0,
      '15-25': 0,
      '25-35': 1.7,
      '35-38': 1.6,
      '38-54': 7.2,
      '180-183': 9.5
    },
    'siderite': {
      '0-5': 0,
      '5-15': 0,
      '15-25': 0,
      '25-35': 0,
      '35-38': 1.3,
      '38-54': 2.8,
      '180-183': 0
    },
    'amorphous': {
      '0-5': null,
      '5-15': null,
      '15-25': null,
      '25-35': null,
      '35-38': null,
      '38-54': null,
      '180-183': null
    },

  };

 
  const x1_var = props.replicate.x1_var;
  const x2_var = props.replicate.x2_var;
  const x3_var = props.replicate.x3_var;

  const x1_value = props.replicate.x1_value;
  const x2_value = props.replicate.x2_value;
  const x3_value = props.replicate.x3_value;
  
  const element = props.replicate.element;
  console.log(props.replicate);

  console.log(x2_value);
  console.log(x3_value);

  var plot, layout;

  if (x1_var === 'time' && x1_value === 'time0') {

    var z = [];

    for (let i = 0; i < x3_value.length; i++) {
      var row = [];
      
      for (let j = 0; j < x2_value.length; j++) {
        row.push(mineralAmounts[x2_value[j]][x3_value[i]]);
      }

      z[i] = row;
    }

    plot = [
      {
        x: x2_value,
        y: x3_value.slice().reverse(),
        z: z.slice().reverse(),
        type: 'heatmap',
        hoverongaps: false,
        colorscale: 'interpolatePurples'
      }
    ];
    
    layout = {
      title: element + ' - ' + x1_value,
      annotations: [],
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xaxis: {
        ticks: '',
        side: 'top'
      },
      yaxis: {
        ticks: '',
        ticksuffix: ' ',
        width: 400,
        height: 400,
        autosize: true
      }
    };
    
  }

  return (
    
    <Box pad="small">
      
      <>
        <Plot
          data={plot}
          layout={layout}
        />
      </> 
      
    </Box>
       

  );
}
