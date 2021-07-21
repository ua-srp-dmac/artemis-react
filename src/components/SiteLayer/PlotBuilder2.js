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

export default function PlotBuilder() {

  const [treatmentSelected, setTreatmentSelected] = React.useState(false);
  const [depthSelected, setDepthSelected] = React.useState(false);
  const [timeSelected, setTimeSelected] = React.useState(false);

  const [selectedVars, setSelectedVars] = React.useState([]);
  const [showPlot, setShowPlot] = React.useState(false);
  
  const [element, setElement] = React.useState('');
  const [treatment, setTreatment] = React.useState('');
  const [time, setTime] = React.useState('');
  const [depth, setDepth] = React.useState('');

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

  if (showPlot && selectedVars.length === 1) {
    
    if (treatmentSelected) {
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

    } else if (depthSelected) {
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
      
    } else if (timeSelected) {
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
      width: 600,
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
  } else if (showPlot && selectedVars.length === 2) {
    if (treatmentSelected && depthSelected) {
      
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
          width: 700,
          height: 700,
          autosize: true
        }
      };
      
    }

  }

  function selectVar(varName) {
    if (varName === 'treatment') {
      if (treatmentSelected) {
        setTreatmentSelected(false);
        let i = selectedVars.indexOf('treatment');
        setSelectedVars([...selectedVars].splice(i, 1));
      } else {
        if (selectedVars.length < 2) {
          setTreatmentSelected(true);
          setSelectedVars(selectedVars.concat('treatment'));
        }
      }
    } else if (varName === 'depth') {
      if (depthSelected) {
        setDepthSelected(false);
        let i = selectedVars.indexOf('depth');
        setSelectedVars([...selectedVars].splice(i, 1));
      } else {
        if (selectedVars.length < 2) {
          setDepthSelected(true);
          setSelectedVars(selectedVars.concat('depth'));
        }
      }
    } else if (varName === 'time') {
      if (timeSelected) {
        setTimeSelected(false);
        let i = selectedVars.indexOf('time');
        setSelectedVars([...selectedVars].splice(i, 1));
      } else {
        if (selectedVars.length < 2) {
          setTimeSelected(true);
          setSelectedVars(selectedVars.concat('time'));
        }
      }
    }
  }



  return (
    
    <>
        { !showPlot &&
          <Box pad="small">
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "xsmall",
                "bottom": "xsmall",
              }}>
                Element
            </Heading>
            <Select
              options={['As', 'Al']}
              value={element}
              onChange={({ option }) => setElement(option)}
              placeholder="Select element"
            />
            
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "xsmall",
                "bottom": "small",
              }}>
              Variables (Up to 2)
            </Heading>
            
            <Box direction="row" align="center" gap="small">
              <Button
                label="Treatment"
                primary={treatmentSelected}
                onClick={() => {selectVar('treatment')}}
                size="small"
              />
              <Button
                label="Depth"
                primary={depthSelected}
                onClick={() => {selectVar('depth')}}
                size="small"
              />
              <Button
                label="Time"
                primary={timeSelected}
                onClick={() => {selectVar('time')}}
                size="small"
              />
            </Box>

            
            { selectedVars.length >= 1 && 
            
              <>
                <Heading level={4}>Set Parameters</Heading> 
                
                { !selectedVars.includes('treatment') &&
                  <Box>
                    <Heading
                      level={5}
                      margin={{
                        "horizontal": "none",
                        "top": "xsmall",
                        "bottom": "xsmall",
                      }}>
                        Treatment
                    </Heading>
                    <Select
                      options={treatments}
                      value={treatment}
                      onChange={({ option }) => setTreatment(option)}
                      placeholder="Select treatment"
                    />
                  </Box>
                }

                { !selectedVars.includes('depth') &&
                  <Box>
                    <Heading
                      level={5}
                      margin={{
                        "horizontal": "none",
                        "top": "xsmall",
                        "bottom": "xsmall",
                      }}>
                        Depth
                    </Heading>
                    <Select
                      options={depths1}
                      value={depth}
                      onChange={({ option }) => setDepth(option)}
                      placeholder="Select depth"
                    />
                  </Box>
                }

                { !selectedVars.includes('time') &&
                  <Box>
                    <Heading
                      level={5}
                      margin={{
                        "horizontal": "none",
                        "top": "xsmall",
                        "bottom": "xsmall",
                      }}>
                        Time
                    </Heading>
                    <Select
                      options={['Time 0', 'Time 1']}
                      value={time}
                      onChange={({ option }) => setTime(option)}
                      placeholder="Select time"
                    />
                  </Box>
                }

                <Box
                  align="center"
                  pad="medium">
                  <Button
                    label="Plot"
                    icon={<BarChart />}
                    onClick={() => {setShowPlot(true)}}
                    primary
                  />
                </Box>
              </>
            }
        </Box>
      }

      { showPlot &&
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

              <Box
                align="center"
                pad="medium">
                <Button
                  icon={<Edit />}
                  label="Edit"
                  onClick={() => {setShowPlot(false)}}
                  primary
                />
              </Box>
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

              <Box
                align="center"
                pad="medium">
                <Button
                  icon={<Edit />}
                  label="Edit"
                  onClick={() => {setShowPlot(false)}}
                  primary
                />
              </Box>
            </> 
          }   
        </Box>
      }

    </>

  );
}
