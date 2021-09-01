import React from 'react';
import Plot from 'react-plotly.js';

import {
  Box,
} from 'grommet';

export default function HeatMapPlot(props) {
  
  const treatments = {
    'treatment1': 'AAO',
    'treatment2': 'AmNO3',
    'treatment3': 'CDB',
    'treatment4': 'AAc',
    'treatment5': 'PO4',
    'treatment6': 'H20'
  };

  const x1_var = props.replicate.x1_var;
  const x2_var = props.replicate.x2_var;
  const x3_var = props.replicate.x3_var;

  const x1_value = props.replicate.x1_value;
  const x2_value = props.replicate.x2_value;
  const x3_value = props.replicate.x3_value;
  
  const element = props.replicate.element;

  var plot, layout;

  if (x1_var === 'time') {

    var z = [];

    for (let i = 0; i < x3_value.length; i++) {
      var row = [];
      
      for (let j = 0; j < x2_value.length; j++) {
        row.push(props.data.data[x1_value][element][treatments[x2_value[j]]][x3_value[i]]);
      }

      z[i] = row;
    }

    plot = [
      {
        x: x2_value.map(function(value) { return treatments[value] }),
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
