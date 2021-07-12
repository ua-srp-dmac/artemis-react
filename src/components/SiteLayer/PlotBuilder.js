import React, {useContext} from 'react';
import Plot from 'react-plotly.js';

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

export default function Overview() {

  // const size = useContext(ResponsiveContext);
  const [plotType, setPlotType] = React.useState('One variable');
  const [element, setElement] = React.useState('Arsenic');
  const [var1, setVar1] = React.useState('');
  const [var2, setVar2] = React.useState('');
  const [treatment, setTreatment] = React.useState('');
  const [time, setTime] = React.useState('');
  const [depth, setDepth] = React.useState('');

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
                "bottom": "none",
              }}>
                Plot Type
            </Heading>
            <Select
              options={['One variable', 'Two variables']}
              value={plotType}
              onChange={({ option }) => setPlotType(option)}
            />

            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "xsmall",
                "bottom": "none",
              }}>
                Element
            </Heading>
            <Select
              options={['Arsenic', 'Aluminum']}
              value={element}
              onChange={({ option }) => setElement(option)}
            />

            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "xsmall",
                "bottom": "none",
              }}>
              Variable 1
            </Heading>
            <Select
              options={['Treatment', 'Depth', 'Time']}
              // value={var1}
              onChange={({ option }) => setVar1(option)}
            />

            { plotType === 'Two variables' && 
              <Box>
                <Heading level={5} margin="none">Variable 2</Heading>
                <Select
                  options={['Treatment', 'Depth', 'Time']}
                  // value={var2}
                  onChange={({ option }) => setVar2(option)}
                />
              </Box>
            }
            
            { var1 && <Heading level={4}>Set Parameters</Heading> }
            
            { (var1 && var1 !== 'Treatment' && var2 !== 'Treatment') &&
              <Box>
                <Heading
                  level={5}
                  margin={{
                    "horizontal": "none",
                    "top": "xsmall",
                    "bottom": "none",
                  }}>
                    Treatment
                </Heading>
                <Select
                  options={[
                    '15% comp seed',
                    '15% comp',
                    '20% comp seed',
                    '20% comp',
                    '10% comp seed',
                    'control'
                  ]}
                  value={treatment}
                  onChange={({ option }) => setTreatment(option)}
                />
              </Box>
            }

            { (var1 && var1 !== 'Depth' && var2 !== 'Depth') &&
              <Box>
                <Heading
                  level={5}
                  margin={{
                    "horizontal": "none",
                    "top": "xsmall",
                    "bottom": "none",
                  }}>
                    Depth
                </Heading>
                <Select
                  options={['0-20', '20-40', '40-60', '60-90']}
                  value={depth}
                  onChange={({ option }) => setDepth(option)}
                />
              </Box>
            }

            { (var1 && var1 !== 'Time' && var2 !== 'Time') &&
              <Box>
                <Heading
                  level={5}
                  margin={{
                    "horizontal": "none",
                    "top": "xsmall",
                    "bottom": "none",
                  }}>
                    Time
                </Heading>
                <Select
                  options={['Time 0', 'Time 1']}
                  value={time}
                  onChange={({ option }) => setTime(option)}
                />
              </Box>
            }
            
      
          </Box>
      </Box>

      <Box flex
        gridArea="main"
      >
        <Box
          flex
          // align='center'
          // justify='center'
        >

        <Heading level={4} margin="small">
          Site Summary

          {/* <Select
              options={['Site Overview', '10% comp', '15% comp seed']}
              value={treatment}
              onChange={({ option }) => setTreatment(option)}
              defaultValue=""
            /> */}
        </Heading>

        <Heading level={6} margin="small">
          Arsenic
        </Heading>

        





       
        </Box>
      </Box>
    </Grid>

  );
}
