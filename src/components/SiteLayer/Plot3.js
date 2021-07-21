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

  // const [selectedVars, setSelectedVars] = React.useState(0);
  const [showPlot, setShowPlot] = React.useState(false);

  const [treatment1_selected, setTreatment1_selected] = React.useState(false);
  const [treatment2_selected, setTreatment2_selected] = React.useState(false);
  const [treatment3_selected, setTreatment3_selected] = React.useState(false);
  const [treatment4_selected, setTreatment4_selected] = React.useState(false);
  const [treatment5_selected, setTreatment5_selected] = React.useState(false);
  const [treatment6_selected, setTreatment6_selected] = React.useState(false);

  const [time0_selected, set_time0_selected] = React.useState(false);
  const [time1_selected, set_time1_selected] = React.useState(false);

  const [depth1_selected, set_depth1_selected] = React.useState(false);
  const [depth2_selected, set_depth2_selected] = React.useState(false);
  const [depth3_selected, set_depth3_selected] = React.useState(false);
  const [depth4_selected, set_depth4_selected] = React.useState(false);


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

  let selectedVars = []

  if (treatmentSelected) {
    selectedVars.push('treatment');
  }
  if (timeSelected) {
    selectedVars.push('time');
  }
  if (depthSelected) {
    selectedVars.push('depth');
  }

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
      } else {
        if (selectedVars.length < 2) {
          setTreatmentSelected(true);
        }
      }
    } else if (varName === 'depth') {
      if (depthSelected) {
        setDepthSelected(false);
      } else {
        if (selectedVars.length < 2) {
          setDepthSelected(true);
        }
      }
    } else if (varName === 'time') {
      if (timeSelected) {
        setTimeSelected(false);
      } else {
        if (selectedVars.length < 2) {
          setTimeSelected(true);
        }
      }
    }
  }

  return (
    
      <Grid
        fill="true"
        rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        align="stretch"
        areas={[
          { name: 'sidebar', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [1, 0], end: [1, 0] },
        ]}>

      <Box flex
        basis="full"
        gridArea="sidebar"
        width="medium">
     
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
            Select Axes (Up to 2)
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
                  {/* <Select
                    options={treatments}
                    value={treatment}
                    onChange={({ option }) => setTreatment(option)}
                    placeholder="Select treatment"
                  /> */}

                  <Box direction="row" align="center" gap="small" >     
                    <Button
                      label="Control"
                      primary={treatment6_selected}
                      onClick={() => {setTreatment6_selected(!treatment6_selected)}}
                      size="small"
                    />
                    <Button
                      label="15% C"
                      primary={treatment2_selected}
                      onClick={() => {setTreatment2_selected(!treatment2_selected)}}
                      size="small"
                    />
                    <Button
                      label="20% C"
                      primary={treatment4_selected}
                      onClick={() => {setTreatment4_selected(!treatment4_selected)}}
                      size="small"
                    />
                  </Box>

                  <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>
                    <Button
                      label="10% CS"
                      primary={treatment5_selected}
                      onClick={() => {setTreatment5_selected(!treatment5_selected)}}
                      size="small"
                    />
                    <Button
                      label="15% CS"
                      primary={treatment1_selected}
                      onClick={() => {setTreatment1_selected(!treatment1_selected)}}
                      size="small"
                    />
                    <Button
                      label="20% CS"
                      primary={treatment3_selected}
                      onClick={() => {setTreatment3_selected(!treatment3_selected)}}
                      size="small"
                    />
                  </Box>
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
                  {/* <Select
                    options={depths1}
                    value={depth}
                    onChange={({ option }) => setDepth(option)}
                    placeholder="Select depth"
                  /> */}
                  <Box direction="row" align="center" gap="small" >     
                    <Button
                      label="0-20"
                      primary={depth1_selected}
                      onClick={() => {set_depth1_selected(!depth1_selected)}}
                      size="small"
                    />
                    <Button
                      label="20-40"
                      primary={depth2_selected}
                      onClick={() => {set_depth2_selected(!depth2_selected)}}
                      size="small"
                    />
                    <Button
                      label="40-60"
                      primary={depth3_selected}
                      onClick={() => {set_depth3_selected(!depth3_selected)}}
                      size="small"
                    />
                    <Button
                      label="60-90"
                      primary={depth4_selected}
                      onClick={() => {set_depth4_selected(!depth4_selected)}}
                      size="small"
                    />
                  </Box>
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
                  {/* <Select
                    options={['Time 0', 'Time 1']}
                    value={time}
                    onChange={({ option }) => setTime(option)}
                    placeholder="Select time"
                  /> */}
                  <Box direction="row" align="center" gap="small" >     
                    <Button
                      label="Time 0"
                      primary={time0_selected}
                      onClick={() => {set_time0_selected(!time0_selected)}}
                      size="small"
                    />
                    <Button
                      label="Time 1"
                      primary={time1_selected}
                      onClick={() => {set_time1_selected(!time1_selected)}}
                      size="small"
                    />
                  </Box>
                </Box>
              }

              <Box
                align="center"
                pad="medium">
                <Button
                  label="Plot"
                  icon={<BarChart />}
                  onClick={() => {setShowPlot(true)}}
                  color="neutral-1"
                  // primary
                />
              </Box>
            </>
          }
        </Box>
      </Box>
        
      <Box flex
        gridArea="main"
      >
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

      </Box>

    </Grid>

  );
}
