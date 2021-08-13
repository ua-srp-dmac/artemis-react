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
  
  var plot, layout, x, y, xAxisTitle, yAxisTitle;

  if (x1_var === 'time' && x1_value === 0) {
    
    if (x2_var === 'mineral') {
      
      var y = [];

      for (let i = 0; i < x3_value.length; i++) {
        y[i] = [];
      }

      for (let i = 0; i < x3_value.length; i++) {
        for (let j = 0; j < x2_value.length; j++) {   
          y[i][j] = props.data.data[0]['raw'][x2_value[j]][x3_value[i]];
        }
      }

      console.log(y)

      plot = []

      for (let i = 0; i < x3_value.length; i++) {
        plot[i] = {
          x: x2_value,
          y: y[i],
          name: x3_value[i],
          type: "bar"
        };
      }
      console.log(plot)

      layout = {
        barmode: 'group',
        title: 'Mineralogy - ' + x1_value,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
          title: x2_var.charAt(0).toUpperCase() + x2_var.slice(1)
        },
        // yaxis: {
        //   title: element + " (mg/kg)"
        // },
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
