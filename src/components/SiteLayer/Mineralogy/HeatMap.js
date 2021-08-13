import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import classNames from 'classnames';

import {
  Box,
} from 'grommet';

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
 
  const x1_var = props.replicate.x1_var;
  const x2_var = props.replicate.x2_var;
  const x3_var = props.replicate.x3_var;

  const x1_value = props.replicate.x1_value;
  const x2_value = props.replicate.x2_value;
  const x3_value = props.replicate.x3_value;

  var plot, layout;

  if (x1_var === 'time' && x1_value === 0) {

    var z = [];

    for (let i = 0; i < x3_value.length; i++) {
      var row = [];
      
      for (let j = 0; j < x2_value.length; j++) {
        row.push(props.data.data[0]['raw'][x2_value[j]][x3_value[i]]);
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
      title: "Mineralogy - " +  x1_value,
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
