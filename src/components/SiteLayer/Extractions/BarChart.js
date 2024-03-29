import React from 'react';
import Plot from 'react-plotly.js';

import {
  Box,
} from 'grommet';

export default function BarChartPlot(props) {

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
    
    if (x2_var === 'treatment') {
      
      var y = [];

      for (let i = 0; i < x3_value.length; i++) {
        y[i] = [];
      }

      for (let i = 0; i < x3_value.length; i++) {
        for (let j = 0; j < x2_value.length; j++) {
          console.log(x1_value);
          console.log(element);
          console.log(x2_value[j]);
          console.log(x3_value[i]); 
          y[i][j] = props.data.data[x1_value][element][treatments[x2_value[j]]][x3_value[i]];
        }
      }

      plot = []

      for (let i = 0; i < x3_value.length; i++) {
        plot[i] = {
          x: x2_value.map(function(value) { return treatments[value]}),
          y: y[i],
          name: x3_value[i],
          type: "bar"
        };
      }

      layout = {
        barmode: 'group',
        title: element + ' - ' + x1_var.charAt(0).toUpperCase() + x1_var.slice(1) + ' ' + x1_value,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
          title: x2_var.charAt(0).toUpperCase() + x2_var.slice(1)
        },
        yaxis: {
          title: element + " (mg/kg)"
        },
      }
    }

    else if (x2_var === 'depth') {
      
      var y = [];

      for (let i = 0; i < x3_value.length; i++) {
        y[i] = [];
      }

      for (let i = 0; i < x3_value.length; i++) {
        for (let j = 0; j < x2_value.length; j++) {    
          y[i][j] = props.data.data[x1_value][element][treatments[x3_value[i]]][x2_value[j]];
        }
      }

      plot = []

      for (let i = 0; i < x3_value.length; i++) {
        plot[i] = {
          x: x2_value,
          y: y[i],
          name: treatments[x3_value[i]],
          type: "bar"
        };
      }

      layout = {
        barmode: 'group',
        title: element + ' - ' + x1_value,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
          title: x2_var.charAt(0).toUpperCase() + x2_var.slice(1)
        },
        yaxis: {
          title: element + " (mg/kg)"
        },
      }
    } 
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
