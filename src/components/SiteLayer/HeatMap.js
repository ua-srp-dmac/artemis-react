import React from 'react';
import Plot from 'react-plotly.js';

import {
  Box,
} from 'grommet';

export default function HeatMapPlot(props) {
  
  const treatments = {
    '15% CS': '15% comp seed',
    '15% C': '15% comp',
    '20% CS': '20% comp seed',
    '20% C': '20% comp',
    '10% CS': '10% comp seed',
    'Control': 'control'
  };

  const treatmentLabels = {
    'treatment1': '15% CS',
    'treatment2': '15% C',
    'treatment3': '20% CS',
    'treatment4': '20% C',
    'treatment5': '10% CS',
    'treatment6': 'Control'
  };

  const x1_var = props.replicate.x1_var;
  const x2_var = props.replicate.x2_var;
  const x3_var = props.replicate.x3_var;

  const x1_value = props.replicate.x1_value;
  const x2_value = props.replicate.x2_value;
  const x3_value = props.replicate.x3_value;
  
  const element = props.replicate.element;

  var plot, layout;

  if (x1_var === 'time' && x1_value === 1) {

    var z = [];

    for (let i = 0; i < x3_value.length; i++) {
      var row = [];
      
      for (let j = 0; j < x2_value.length; j++) {
        row.push(props.data.data[1][treatments[treatmentLabels[x2_value[j]]]][element][x3_value[i]]);
      }

      z[i] = row;
    }

    plot = [
      {
        x: x2_value.map(function(value) { return treatmentLabels[value] }),
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
