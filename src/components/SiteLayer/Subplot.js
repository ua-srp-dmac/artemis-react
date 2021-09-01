import React, {useContext} from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

import SubplotPlot from './SubplotPlot';

import ReactSelect from 'react-select';

import {
  Box,
  Button,
  Grid,
  Text,
  Card,
  Heading,
  Select,
  ResponsiveContext,
  Anchor
} from 'grommet';

import {
  BarChart
} from 'grommet-icons';


export default function Experiment() {

  const size = useContext(ResponsiveContext);
  
  const getData = () => {
    axios.get('site-geochem-cache/6')
    .then((response) => {
      const data = response.data;
      setData(data)
      console.log(data);
    })
    .catch(error => console.log(error));
  }

  
  const [showPlot, setShowPlot] = React.useState(false);
  const [data, setData] = React.useState(null)
  const [elementsSelected, setElementsSelected] = React.useState([]);

  const [treatment1_selected, set_treatment1_selected] = React.useState(false);
  const [treatment2_selected, set_treatment2_selected] = React.useState(false);
  const [treatment3_selected, set_treatment3_selected] = React.useState(false);
  const [treatment4_selected, set_treatment4_selected] = React.useState(false);
  const [treatment5_selected, set_treatment5_selected] = React.useState(false);
  const [treatment6_selected, set_treatment6_selected] = React.useState(false);

  const [time0_selected, set_time0_selected] = React.useState(false);
  const [time1_selected, set_time1_selected] = React.useState(false);

  const [depth1_selected, set_depth1_selected] = React.useState(false);
  const [depth2_selected, set_depth2_selected] = React.useState(false);
  const [depth3_selected, set_depth3_selected] = React.useState(false);
  const [depth4_selected, set_depth4_selected] = React.useState(false);

  const [plotType, setPlotType] = React.useState('bar');
  const [groupBy, setGroupBy] = React.useState('treatment');

  React.useEffect(() => {
    getData();
  }, []);

  if (data) {

    var trace1 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['10% comp seed']['As']['0-20'], 
        data[1]['10% comp seed']['As']['0-20'],
      ],
      type: 'scatter',
      line: {
        color: 'purple',
      },
      name: "0-20",
    };

    var trace2 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['10% comp seed']['As']['20-40'], 
        data[1]['10% comp seed']['As']['20-40'],
      ],
      type: 'scatter',
      xaxis: 'x',
      yaxis: 'y',
      line: {
        color: 'green',
      },
      name: "20-40",
    };

    var trace3 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['10% comp seed']['As']['40-60'], 
        data[1]['10% comp seed']['As']['40-60'],
      ],
      type: 'scatter',
      xaxis: 'x',
      yaxis: 'y',
      line: {
        color: 'orange',
      },
      name: "40-60",
    };

    var trace4 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['10% comp seed']['As']['60-90'], 
        data[1]['10% comp seed']['As']['60-90'],
      ],
      type: 'scatter',
      xaxis: 'x',
      yaxis: 'y',
      line: {
        color: 'red',
      },
      name: "60-90",
    };
    
    var trace5 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['15% comp']['As']['0-20'], 
        data[1]['15% comp']['As']['0-20'],
      ],
      type: 'scatter',
      xaxis: 'x2',
      yaxis: 'y2',
      line: {
        color: 'purple',
      },
      showlegend: false,
    };

    var trace6 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['15% comp']['As']['20-40'], 
        data[1]['15% comp']['As']['20-40'],
      ],
      type: 'scatter',
      xaxis: 'x2',
      yaxis: 'y2',
      line: {
        color: 'green',
      },
      showlegend: false,
    };

    var trace7 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['15% comp']['As']['40-60'], 
        data[1]['15% comp']['As']['40-60'],
      ],
      type: 'scatter',
      xaxis: 'x2',
      yaxis: 'y2',
      line: {
        color: 'orange',
      },
      showlegend: false,
    };

    var trace8 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['15% comp']['As']['60-90'], 
        data[1]['15% comp']['As']['60-90'],
      ],
      type: 'scatter',
      xaxis: 'x2',
      yaxis: 'y2',
      line: {
        color: 'red',
      },
      showlegend: false,
    };
    
    var trace9 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['20% comp']['As']['0-20'], 
        data[1]['20% comp']['As']['0-20'],
      ],
      type: 'scatter',
      xaxis: 'x3',
      yaxis: 'y3',
      line: {
        color: 'purple',
      },
      showlegend: false,
    };

    var trace10 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['20% comp']['As']['20-40'], 
        data[1]['20% comp']['As']['20-40'],
      ],
      type: 'scatter',
      xaxis: 'x3',
      yaxis: 'y3',
      line: {
        color: 'green',
      },
      showlegend: false,
    };

    var trace11 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['20% comp']['As']['40-60'], 
        data[1]['20% comp']['As']['40-60'],
      ],
      type: 'scatter',
      xaxis: 'x3',
      yaxis: 'y3',
      line: {
        color: 'orange',
      },
      showlegend: false,
    };

    var trace12 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['20% comp']['As']['60-90'], 
        data[1]['20% comp']['As']['60-90'],
      ],
      type: 'scatter',
      xaxis: 'x3',
      yaxis: 'y3',
      line: {
        color: 'red',
      },
      showlegend: false,
    };
    
    var trace13 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['control']['As']['0-20'], 
        data[1]['control']['As']['0-20'],
      ],
      type: 'scatter',
      xaxis: 'x4',
      yaxis: 'y4',
      line: {
        color: 'purple',
      },
      showlegend: false,
    };

    var trace14 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['control']['As']['20-40'], 
        data[1]['control']['As']['20-40'],
      ],
      type: 'scatter',
      xaxis: 'x4',
      yaxis: 'y4',
      line: {
        color: 'green',
      },
      showlegend: false,
    };

    var trace15 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['control']['As']['40-60'], 
        data[1]['control']['As']['40-60'],
      ],
      type: 'scatter',
      xaxis: 'x4',
      yaxis: 'y4',
      line: {
        color: 'orange',
      },
      showlegend: false,
    };

    var trace16 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['control']['As']['60-90'], 
        data[1]['control']['As']['60-90'],
      ],
      type: 'scatter',
      xaxis: 'x4',
      yaxis: 'y4',
      line: {
        color: 'red',
      },
      showlegend: false,
    };

    var trace17 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['10% comp seed']['Pb']['0-20'], 
        data[1]['10% comp seed']['Pb']['0-20'],
      ],
      type: 'scatter',
      xaxis: 'x5',
      yaxis: 'y5',
      line: {
        color: 'purple',
      },
      showlegend: false,
    };

    var trace18 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['10% comp seed']['Pb']['20-40'], 
        data[1]['10% comp seed']['Pb']['20-40'],
      ],
      type: 'scatter',
      xaxis: 'x5',
      yaxis: 'y5',
      line: {
        color: 'green',
      },
      showlegend: false,

    };

    var trace19 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['10% comp seed']['Pb']['40-60'], 
        data[1]['10% comp seed']['Pb']['40-60'],
      ],
      type: 'scatter',
      xaxis: 'x5',
      yaxis: 'y5',
      line: {
        color: 'orange',
      },
      showlegend: false,
    };

    var trace20 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['10% comp seed']['Pb']['60-90'], 
        data[1]['10% comp seed']['Pb']['60-90'],
      ],
      type: 'scatter',
      xaxis: 'x5',
      yaxis: 'y5',
      line: {
        color: 'red',
      },
      showlegend: false,
    };
    
    var trace21 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['15% comp']['Pb']['0-20'], 
        data[1]['15% comp']['Pb']['0-20'],
      ],
      type: 'scatter',
      xaxis: 'x6',
      yaxis: 'y6',
      line: {
        color: 'purple',
      },
      showlegend: false,
    };

    var trace22 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['15% comp']['Pb']['20-40'], 
        data[1]['15% comp']['Pb']['20-40'],
      ],
      type: 'scatter',
      xaxis: 'x6',
      yaxis: 'y6',
      line: {
        color: 'green',
      },
      showlegend: false,
    };

    var trace23 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['15% comp']['Pb']['40-60'], 
        data[1]['15% comp']['Pb']['40-60'],
      ],
      type: 'scatter',
      xaxis: 'x6',
      yaxis: 'y6',
      line: {
        color: 'orange',
      },
      showlegend: false,
    };

    var trace24 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['15% comp']['Pb']['60-90'], 
        data[1]['15% comp']['Pb']['60-90'],
      ],
      type: 'scatter',
      xaxis: 'x6',
      yaxis: 'y6',
      line: {
        color: 'red',
      },
      showlegend: false,
    };
    
    var trace25 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['20% comp']['Pb']['0-20'], 
        data[1]['20% comp']['Pb']['0-20'],
      ],
      type: 'scatter',
      xaxis: 'x7',
      yaxis: 'y7',
      line: {
        color: 'purple',
      },
      showlegend: false,
    };

    var trace26 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['20% comp']['Pb']['20-40'], 
        data[1]['20% comp']['Pb']['20-40'],
      ],
      type: 'scatter',
      xaxis: 'x7',
      yaxis: 'y7',
      line: {
        color: 'green',
      },
      showlegend: false,
    };

    var trace27 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['20% comp']['Pb']['40-60'], 
        data[1]['20% comp']['Pb']['40-60'],
      ],
      type: 'scatter',
      xaxis: 'x7',
      yaxis: 'y7',
      line: {
        color: 'orange',
      },
      showlegend: false,
    };

    var trace28 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['20% comp']['Pb']['60-90'], 
        data[1]['20% comp']['Pb']['60-90'],
      ],
      type: 'scatter',
      xaxis: 'x7',
      yaxis: 'y7',
      line: {
        color: 'red',
      },
      showlegend: false,
    };
    
    var trace29 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['control']['Pb']['0-20'], 
        data[1]['control']['Pb']['0-20'],
      ],
      type: 'scatter',
      xaxis: 'x8',
      yaxis: 'y8',
      line: {
        color: 'purple',
      },
      showlegend: false,
    };

    var trace30 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['control']['Pb']['20-40'], 
        data[1]['control']['Pb']['20-40'],
      ],
      type: 'scatter',
      xaxis: 'x8',
      yaxis: 'y8',
      line: {
        color: 'green',
      },
      showlegend: false,
    };

    var trace31 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['control']['Pb']['40-60'], 
        data[1]['control']['Pb']['40-60'],
      ],
      type: 'scatter',
      xaxis: 'x8',
      yaxis: 'y8',
      line: {
        color: 'orange',
      },
      showlegend: false,
    };

    var trace32 = {
      x: [
        0, 1
      ],
      y: [
        data[0]['control']['Pb']['60-90'], 
        data[1]['control']['Pb']['60-90'],
      ],
      type: 'scatter',
      xaxis: 'x8',
      yaxis: 'y8',
      line: {
        color: 'red',
      },
      showlegend: false,
    };
    
    var plotData = [
      trace1,
      trace2,
      trace3,
      trace4,
      trace5,
      trace6,
      trace7,
      trace8,
      trace9,
      trace10,
      trace11,
      trace12,
      trace13,
      trace14,
      trace15,
      trace16,
      trace17,
      trace18,
      trace19,
      trace20,
      trace21,
      trace22,
      trace23,
      trace24,
      trace25,
      trace26,
      trace27,
      trace28,
      trace29,
      trace30,
      trace31,
      trace32,
    ];
    
    var layout = {
      width:900,
      height:600,
      annotations: [
        {
          text: "Arsenic - 10% Comp Seed",
          x: .5,
          y: 1.2,
          xref: "x domain",
          yref: "y domain",
          showarrow: false,
        },
        {
          text: "Arsenic - 15% Comp",
          x: .5,
          y: 1.2,
          xref: "x2 domain",
          yref: "y2 domain",
          showarrow: false,
        },
        {
          text: "Arsenic - 25% Comp",
          x: .5,
          y: 1.2,
          xref: "x3 domain",
          yref: "y3 domain",
          showarrow: false,
        },
        {
          text: "Arsenic - Control",
          x: .5,
          y: 1.2,
          xref: "x4 domain",
          yref: "y4 domain",
          showarrow: false,
        },
        {
          text: "Lead - 10% Comp Seed",
          x: .5,
          y: 1.2,
          xref: "x5 domain",
          yref: "y5 domain",
          showarrow: false,
        },
        {
          text: "Lead - 15% Comp",
          x: .5,
          y: 1.2,
          xref: "x6 domain",
          yref: "y6 domain",
          showarrow: false,
        },
        {
          text: "Lead - 25% Comp",
          x: .5,
          y: 1.2,
          xref: "x7 domain",
          yref: "y7 domain",
          showarrow: false,
        },
        {
          text: "Lead - Control",
          x: .5,
          y: 1.2,
          xref: "x8 domain",
          yref: "y8 domain",
          showarrow: false,
        }
      ],
      grid: {rows: 2, columns: 4, pattern: 'independent'},
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xaxis: {range: [0, 2]},
      yaxis: {range: [1400, 5000]},
      xaxis2: {range: [0, 2]},
      yaxis2: {range: [1400, 5000]},
      xaxis3: {range: [0, 2]},
      yaxis3: {range: [1400, 5000]},
      xaxis4: {range: [0, 2]},
      yaxis4: {range: [1400, 5000]},
      xaxis5: {range: [0, 2]},
      yaxis5: {range: [1400, 5000]},
      xaxis6: {range: [0, 2]},
      yaxis6: {range: [1400, 5000]},
      xaxis7: {range: [0, 2]},
      yaxis7: {range: [1400, 5000]},
      xaxis8: {range: [0, 2]},
      yaxis8: {range: [1400, 5000]}

    };
  
  }

  const treatments = [
    '15% CS',
    '15% C',
    '20% CS',
    '20% C',
    '10% CS',
    'control'
  ];

  const depths0 = [
    '0-5',
    '5-15',
    '15-25',
    '25-35',
    '35-38',
    '38-54',
    '180-183'
  ];

  const depths1 = [
    '0-20',
    '20-40',
    '40-60',
    '60-90'
  ];

  const times = [
    'Time 0',
    'Time 1'
  ];

  const elements = [
    { value: 'Ag', label: 'Ag'},
    { value: 'Al', label: 'Al'},
    { value: 'As', label: 'As'},
    { value: 'Au', label: 'Au'},
    { value: 'Ba', label: 'Ba'},
    { value: 'Be', label: 'Be'},
    { value: 'Bi', label: 'Bi'},
    { value: 'Br', label: 'Br'},
    { value: 'Ca', label: 'Ca'},
    { value: 'Cd', label: 'Cd'},
    { value: 'Ce', label: 'Ce'},
    { value: 'Co', label: 'Co'},
    { value: 'Cr', label: 'Cr'},
    { value: 'Cs', label: 'Cs'},
    { value: 'Cu', label: 'Cu'},
    { value: 'Dy', label: 'Dy'},
    { value: 'Er', label: 'Er'},
    { value: 'Eu', label: 'Eu'},
    { value: 'Fe', label: 'Fe'},
    { value: 'Ga', label: 'Ga'},
    { value: 'Gd', label: 'Gd'},
    { value: 'Ge', label: 'Ge'},
    { value: 'Hf', label: 'Hf'},
    { value: 'Ho', label: 'Ho'},
    { value: 'In', label: 'In'},
    { value: 'Ir', label: 'Ir'},
    { value: 'K', label: 'K'},
    { value: 'La', label: 'La'},
    { value: 'Lu', label: 'Lu'},
    { value: 'Mg', label: 'Mg'},
    { value: 'Mn', label: 'Mn'},
    { value: 'Mo', label: 'Mo'},
    { value: 'Na', label: 'Na'},
    { value: 'Nb', label: 'Nb'},
    { value: 'Nd', label: 'Nd'},
    { value: 'Ni', label: 'Ni'},
    { value: 'P', label: 'P'},
    { value: 'Pb', label: 'Pb'},
    { value: 'Pr', label: 'Pr'},
    { value: 'Rb', label: 'Rb'},
    { value: 'S', label: 'S'},
    { value: 'Sb', label: 'Sb'},
    { value: 'Sc', label: 'Sc'},
    { value: 'Se', label: 'Se'},
    { value: 'Si', label: 'Si'},
    { value: 'Sm', label: 'Sm'},
    { value: 'Sn', label: 'Sn'},
    { value: 'Sr', label: 'Sr'},
    { value: 'Ta', label: 'Ta'},
    { value: 'Tb', label: 'Tb'},
    { value: 'Th', label: 'Th'},
    { value: 'Ti', label: 'Ti'},
    { value: 'Tl', label: 'Tl'},
    { value: 'Tm', label: 'Tm'},
    { value: 'U', label: 'U'},
    { value: 'V', label: 'V'},    
    { value: 'W', label: 'W'},    
    { value: 'Y', label: 'Y'},    
    { value: 'Yb', label: 'Yb'},
    { value: 'Zn', label: 'Zn'},
    { value: 'Zr', label: 'Zr'},
  ]

  let treatmentsSelected = []
  let depthsSelected = []
  let timesSelected = []

  for (let i = 0; i < treatments.length; i++ ) {
    if (eval('treatment' + (i + 1).toString() + '_selected')) {
      treatmentsSelected.push('treatment' + (i + 1).toString());
    }
  }

  for (let i = 0; i < depths1.length; i++ ) {
    if (eval('depth' + (i + 1).toString() + '_selected')) {
      depthsSelected.push(depths1[i]);
    }
  }

  if (time0_selected) {
    timesSelected.push(0);
  }
  
  if (time1_selected) {
    timesSelected.push(1);
  }

  var replicatePlots = [];

  const varNames = ['treatment', 'depth', 'time'];

  if (plotType === 'bar') {
    for (let i = 0; i < timesSelected.length; i++) {
      for (let j = 0; j < elementsSelected.length; j++) {
        if (groupBy === 'treatment') {
          replicatePlots.push({
            element: elementsSelected[j].value,
            type: "bar",
            x1_var: "time",
            x1_value: timesSelected[i],
            x2_var: "treatment",
            x2_value: treatmentsSelected,
            x3_var: "depth",
            x3_value: depthsSelected,
          });
        } else if (groupBy === 'depth') {
          replicatePlots.push({
            element: elementsSelected[j].value,
            type: "bar",
            x1_var: "time",
            x1_value: timesSelected[i],
            x2_var: "depth",
            x2_value: depthsSelected,
            x3_var: "treatment",
            x3_value: treatmentsSelected,
          });
        }
      }
    } 
  } else if (plotType === 'heat') {
    for (let i = 0; i < timesSelected.length; i++) {
      for (let j = 0; j < elementsSelected.length; j++) {
        replicatePlots.push({
          element: elementsSelected[j].value,
          type: "heat",
          x1_var: "time",
          x1_value: timesSelected[i],
          x2_var: "treatment",
          x2_value: treatmentsSelected,
          x3_var: "depth",
          x3_value: depthsSelected,
        });
      }     
    }
  }

  function selectAllTreatments() {
    set_treatment1_selected(true);
    set_treatment2_selected(true);
    set_treatment3_selected(true);
    set_treatment4_selected(true);
    set_treatment5_selected(true);
    set_treatment6_selected(true);
  }

  function clearTreatments() {
    set_treatment1_selected(false);
    set_treatment2_selected(false);
    set_treatment3_selected(false);
    set_treatment4_selected(false);
    set_treatment5_selected(false);
    set_treatment6_selected(false);
  }

  function selectAllDepths() {
    set_depth1_selected(true);
    set_depth2_selected(true);
    set_depth3_selected(true);
    set_depth4_selected(true);
  }

  function clearDepths() {
    set_depth1_selected(false);
    set_depth2_selected(false);
    set_depth3_selected(false);
    set_depth4_selected(false);
  }

  function selectAllTimes() {
    set_time0_selected(true);
    set_time1_selected(true);
  }

  function clearTimes() {
    set_time0_selected(false);
    set_time1_selected(false);
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
          
          {/* <Select
            options={elements}
            value={element}
            multiple
            onChange={({ value: nextValue }) => setElement(nextValue)}
            placeholder="Select element"
          /> */}

          <ReactSelect
            value={elementsSelected}
            isMulti
            isSearchable
            options={elements}
            className="basic-multi-select"
            onChange={ (selectedOption) => {
              setElementsSelected(selectedOption);
              console.log(`Option selected:`, selectedOption);
            }}
            classNamePrefix="select"
          />
          
          <Box>
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Treatment
                { treatmentsSelected.length === 0 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={selectAllTreatments}>
                    Select all
                  </Anchor>
                }

                { treatmentsSelected.length >= 1 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={clearTreatments}>
                    Clear All
                  </Anchor>
                }
                
            </Heading>

            <Box direction="row" align="center" gap="small" >     
              <Button
                label="Control"
                primary={treatment6_selected}
                onClick={() => {set_treatment6_selected(!treatment6_selected)}}
                size="small"
              />
              <Button
                label="15% C"
                primary={treatment2_selected}
                onClick={() => {set_treatment2_selected(!treatment2_selected)}}
                size="small"
              />
              <Button
                label="20% C"
                primary={treatment4_selected}
                onClick={() => {set_treatment4_selected(!treatment4_selected)}}
                size="small"
              />
            </Box>

            <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>
              <Button
                label="10% CS"
                primary={treatment5_selected}
                onClick={() => {set_treatment5_selected(!treatment5_selected)}}
                size="small"
              />
              <Button
                label="15% CS"
                primary={treatment1_selected}
                onClick={() => {set_treatment1_selected(!treatment1_selected)}}
                size="small"
              />
              <Button
                label="20% CS"
                primary={treatment3_selected}
                onClick={() => {set_treatment3_selected(!treatment3_selected)}}
                size="small"
              />
            </Box>
          </Box>
    
          <Box>
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Depth

                { depthsSelected.length === 0 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={selectAllDepths}>
                    Select all
                  </Anchor>
                }

                { depthsSelected.length >= 1 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={clearDepths}>
                    Clear All
                  </Anchor>
                }
            </Heading>

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

          <Box>
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Time
                { timesSelected.length === 0 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={selectAllTimes}>
                    Select all
                  </Anchor>
                }

                { timesSelected.length >= 1 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={clearTimes}>
                    Clear All
                  </Anchor>
                }
            </Heading>

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

          { elementsSelected.length > 0 && treatmentsSelected.length > 0 && depthsSelected.length > 0 && timesSelected.length > 0 &&
            <>
              <Box>
                <Heading
                  level={5}
                  margin={{
                    "horizontal": "none",
                    "top": "medium",
                    "bottom": "xsmall",
                  }}>
                    Plot Type
                </Heading>

                <Box direction="row" align="center" gap="small" >     
                  <Button
                    label="Bar Chart"
                    primary={plotType === "bar"}
                    onClick={() => {setPlotType("bar")}}
                    size="small"
                  />
                  <Button
                    label="Heat Map"
                    primary={plotType === "heat"}
                    onClick={() => {setPlotType("heat")}}
                    size="small"
                  />
                </Box>
              </Box>
            
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
        {!showPlot &&
          <Box pad="small" align="center" margin="large">
            <BarChart size='large'></BarChart>
            <Text margin="medium">Select variables to build a plot.</Text>
          </Box>
        }
    
        {showPlot && data &&
        <Box pad="small">
          <Grid columns={size === 'small' ? 'medium' : 'medium'} gap="small">
            <Plot
              data={plotData}
              layout={layout}
            />
          </Grid>
        </Box>
        }

      </Box>

    </Grid>

  );
}
