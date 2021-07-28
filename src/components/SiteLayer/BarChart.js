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
  
  const treatments = [
    '15% comp seed',
    '15% comp',
    '20% comp seed',
    '20% comp',
    '10% comp seed',
    'control'
  ];

  const treatmentLabels = {
    'treatment1': '15% CS',
    'treatment2': '15% C',
    'treatment3': '20% CS',
    'treatment4': '20% C',
    'treatment5': '10% CS',
    'treatment6': 'Control'
  };

  var treatment1 = {
    'Al': {
      '0-20': null,
      '20-40': null,
      '40-60': null,
      '60-90': null
    },
    'As': {
      '0-20': null,
      '20-40': null,
      '40-60': null,
      '60-90': null
    },
  };

  var treatment2 = {
    'Al': {
      '0-20': 36042.00,
      '20-40': 45357.00,
      '40-60': 27627.00,
      '60-90': 32126.00
    },
    'As': {
      '0-20': 2800.00,
      '20-40': 2590.00,
      '40-60': 3580.00,
      '60-90': 3100.00
    },
  };

  var treatment3 = {
    'Al': {
      '0-20': null,
      '20-40': null,
      '40-60': null,
      '60-90': null
    },
    'As': {
      '0-20': null,
      '20-40': null,
      '40-60': null,
      '60-90': null
    },
  };

  var treatment4 = {
    'Al': {
      '0-20': 36412.00,
      '20-40': 36412.00,
      '40-60': 38688.00,
      '60-90': 22969.00
    },
    'As': {
      '0-20': 3100.00,
      '20-40': 2940.00,
      '40-60': 3040.00,
      '60-90': 3240.00
    },
  };

  var treatment5 = {
    'Al': {
      '0-20': 25034.00,
      '20-40': 33819.00,
      '40-60': 31967.00,
      '60-90': 23922.00
    },
    'As': {
      '0-20': 3540.00,
      '20-40': 3800.00,
      '40-60': 3680.00,
      '60-90': 3600.00
    },
  };

  var treatment6 = {
    'Al': {
      '0-20': 21000.00,
      '20-40': 17200.00,
      '40-60': 20400.0,
      '60-90': 22900.00
    },
    'As': {
      '0-20': 3810.00,
      '20-40': 3520.00,
      '40-60': 4520.00,
      '60-90': 3330.00
    },
  };

  var time0 = {
    'Al': [21275.88, 22228.53, 22175.60, 28473.69, 43610.26, 29743.89, 27865.05],
    'As': [3080.00,	2820.00, 4080.00,	3990.00, 5250.00, 4840.00, 3317.50],
  };

  var time0_avg = {
    'Al': {
      '0-20': 21751.5,
      '20-40': 31419.00,
      '40-60': 29743.89,
      '60-90': null
    },
    'As': {
      '0-20': 2950,
      '20-40': 4440,
      '40-60': 4840.00,
      '60-90': null
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

  var plot, layout, x, y, xAxisTitle, yAxisTitle;

  if (x1_var === 'time' && x1_value === 'time1') {
    
    if (x2_var === 'treatment') {
      
      var y = [];

      for (let i = 0; i < x3_value.length; i++) {
        y[i] = [];
      }

      for (let i = 0; i < x3_value.length; i++) {
        for (let j = 0; j < x2_value.length; j++) {   
          y[i][j] = eval(x2_value[j])[element][x3_value[i]];
        }
      }

      console.log(y)

      plot = []

      for (let i = 0; i < x3_value.length; i++) {
        plot[i] = {
          x: x2_value.map(function(value) { return treatmentLabels[value]}),
          y: y[i],
          name: x3_value[i],
          type: "bar"
        };
      }
      console.log(plot)

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
