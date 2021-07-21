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

export default function PlotBuilder(props) {

  console.log(props.selectedVars);
  console.log(props.replicate);
  console.log(props.element);

  var element = props.element;
  var selectedVars = props.selectedVars;
  var replicate = props.replicate;

  var time, depth, treatment;

  if (replicate.includes('time0')) {
    time = 'Time 0';
  } else if (replicate.includes('time1')) {
    time = 'Time 1';
  }

  if (replicate.includes('depth1')) {
    depth = '0-20';
  } else if (replicate.includes('depth2')) {
    depth = '20-40';
  } else if (replicate.includes('depth3')) {
    depth = '40-60';
  } else if (replicate.includes('depth4')) {
    depth = '60-90';
  }

  if (replicate.includes('treatment1')) {
    treatment = '15% comp seed';
  } else if (replicate.includes('treatment2')) {
    treatment = '15% comp';
  } else if (replicate.includes('treatment3')) {
    treatment = '20% comp seed';
  } else if (replicate.includes('treatment4')) {
    treatment = '20% comp';
  } else if (replicate.includes('treatment5')) {
    treatment = '10% comp seed';
  } else if (replicate.includes('treatment6')) {
    treatment = 'control';
  }


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

  const treatmentLabels = [
    '15% comp seed',
    '15% comp',
    '20% comp seed',
    '20% comp',
    '10% comp seed',
    'control'
  ];

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

  var plot, layout, x, y, xAxisTitle, yAxisTitle;



  if (selectedVars.length === 1) {
    
    if (selectedVars.includes('treatment')) {
      x = treatments;

      if (time === 'Time 0') {
        y = [
          time0_avg[element][depth],
          time0_avg[element][depth],
          time0_avg[element][depth],
          time0_avg[element][depth],
          time0_avg[element][depth],
          time0_avg[element][depth]
        ];
      } else {
        y = [
          treatment1[element][depth],
          treatment2[element][depth],
          treatment3[element][depth],
          treatment4[element][depth],
          treatment5[element][depth],
          treatment6[element][depth],
        ]
      }

      xAxisTitle = 'Treatment'
      yAxisTitle = 'mg/kg'     

    } else if (selectedVars.includes('depth')) {
      x = depths1;
    
      if (treatment === '15% comp seed') {
        y = [
          treatment1[element]['0-20'],
          treatment1[element]['20-40'],
          treatment1[element]['40-60'],
          treatment1[element]['60-90'],
        ];
      } else if (treatment === '15% comp') {
        y = [
          treatment2[element]['0-20'],
          treatment2[element]['20-40'],
          treatment2[element]['40-60'],
          treatment2[element]['60-90'],
        ];
      } else if (treatment === '20% comp seed') {
        y = [
          treatment3[element]['0-20'],
          treatment3[element]['20-40'],
          treatment3[element]['40-60'],
          treatment3[element]['60-90'],
        ];
      } else if (treatment === '20% comp') {
        y = [
          treatment4[element]['0-20'],
          treatment4[element]['20-40'],
          treatment4[element]['40-60'],
          treatment4[element]['60-90'],
        ];
      } else if (treatment === '10% comp seed') {
        y = [
          treatment5[element]['0-20'],
          treatment5[element]['20-40'],
          treatment5[element]['40-60'],
          treatment5[element]['60-90'],
        ];
      } else if (treatment === 'control') {
        y = [
          treatment6[element]['0-20'],
          treatment6[element]['20-40'],
          treatment6[element]['40-60'],
          treatment6[element]['60-90'],
        ];
      }

      xAxisTitle = 'Depth (cm)'
      yAxisTitle = 'mg/kg'
      
    } else if (selectedVars.includes('time')) {
      x = ['Time 0', 'Time 1'];

      if (treatment === '15% comp seed') {
        y = [
          time0_avg[element][depth],
          treatment1[element][depth],
        ];
      } else if (treatment === '15% comp') {
        y = [
          time0_avg[element][depth],
          treatment2[element][depth],
        ];
      } else if (treatment === '20% comp seed') {
        y = [
          time0_avg[element][depth],
          treatment3[element][depth],
        ];
      } else if (treatment === '20% comp') {
        y = [
          time0_avg[element][depth],
          treatment4[element][depth],
        ];
      } else if (treatment === '10% comp seed') {
        y = [
          time0_avg[element][depth],
          treatment5[element][depth],
        ];
      } else if (treatment === 'control') {
        y = [
          time0_avg[element][depth],
          treatment6[element][depth],
        ];
      }

      xAxisTitle = 'Time'
      yAxisTitle = 'mg/kg'

    }

    plot = [
      {
        x: x,
        y: y,
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

    layout = {
      width: 400,
      height: 400,
      title: element,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xaxis: {
        title: xAxisTitle
      },
      yaxis: {
        title: yAxisTitle
      },
    }
  } else if (selectedVars.length === 2) {
    if (selectedVars.includes('treatment') && selectedVars.includes('depth')) {
      
      plot = [
        {
          x: treatments,
          y: depths1.reverse(),
          z: [
            [
              treatment1[element]['0-20'],
              treatment2[element]['0-20'],
              treatment3[element]['0-20'],
              treatment4[element]['0-20'],
              treatment5[element]['0-20'],
              treatment6[element]['0-20'],
            ],
            [
              treatment1[element]['20-40'],
              treatment2[element]['20-40'],
              treatment3[element]['20-40'],
              treatment4[element]['20-40'],
              treatment5[element]['20-40'],
              treatment6[element]['20-40'],
            ], 
            [
              treatment1[element]['40-60'],
              treatment2[element]['40-60'],
              treatment3[element]['40-60'],
              treatment4[element]['40-60'],
              treatment5[element]['40-60'],
              treatment6[element]['40-60'],
            ], 
            [
              treatment1[element]['60-90'],
              treatment2[element]['60-90'],
              treatment3[element]['60-90'],
              treatment4[element]['60-90'],
              treatment5[element]['60-90'],
              treatment6[element]['60-90'],
            ], 
          ].reverse(),
          type: 'heatmap',
          hoverongaps: false,
          colorscale: 'interpolatePurples'
        }
      ];
      
      layout = {
        title: element,
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

  }



  return (
    
    <Box pad="small">
      { selectedVars.length === 1 && element && (
          (depth && treatment) || 
          (depth && time) ||
          (treatment && time)
        ) &&
        <>
          <Plot
            data={plot}
            layout={layout}
          />

       
        </> 
      }

      { selectedVars.length === 2 && element && (
          (depth || treatment || time)
        ) &&
        <>
          <Plot
            data={plot}
            layout={layout}
          />

  
        </> 
      }   
    </Box>
       

  );
}
