import React from 'react';
import Plot from 'react-plotly.js';

import {
  Box,
} from 'grommet';

export default function SubplotPlot(props) {

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

  if (x1_var === 'time') {
    
    if (x2_var === 'treatment') {
      
      var y = [];

      for (let i = 0; i < x3_value.length; i++) {
        y[i] = [];
      }

      for (let i = 0; i < x3_value.length; i++) {
        for (let j = 0; j < x2_value.length; j++) {   
          y[i][j] = props.data.data[x1_value][treatments[treatmentLabels[x2_value[j]]]][element][x3_value[i]];
        }
      }

      plot = []

      for (let i = 0; i < x3_value.length; i++) {
        plot[i] = {
          x: x2_value.map(function(value) { return treatmentLabels[value]}),
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
          y[i][j] = props.data.data[x1_value][treatments[treatmentLabels[x3_value[i]]]][element][x2_value[j]];
        }
      }

      plot = []

      for (let i = 0; i < x3_value.length; i++) {
        plot[i] = {
          x: x2_value,
          y: y[i],
          name: treatmentLabels[x3_value[i]],
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
