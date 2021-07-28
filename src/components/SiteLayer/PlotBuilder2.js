import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import classNames from 'classnames';

import BarChartPlot from './BarChart';
import HeatMapPlot from './HeatMap';

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

export default function PlotBuilder2() {

  const size = useContext(ResponsiveContext);

  
  const [showPlot, setShowPlot] = React.useState(false);
  const [element, setElement] = React.useState('');

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
    timesSelected.push('time0');
  }
  
  if (time1_selected) {
    timesSelected.push('time1');
  }

  console.log(treatmentsSelected);
  console.log(depthsSelected);
  console.log(timesSelected);

  var replicatePlots = [];

  const varNames = ['treatment', 'depth', 'time'];

  if (plotType === 'bar') {
    if (timesSelected.length === 1) {
      replicatePlots.push({
        element: element,
        type: "bar",
        x1_var: "time",
        x1_value: timesSelected[0],
        x2_var: "treatment",
        x2_value: treatmentsSelected,
        x3_var: "depth",
        x3_value: depthsSelected,
      });
    } 
  } else if (plotType === 'heat') {
    replicatePlots.push({
      element: element,
      type: "heat",
      x1_var: "time",
      x1_value: timesSelected[0],
      x2_var: "treatment",
      x2_value: treatmentsSelected,
      x3_var: "depth",
      x3_value: depthsSelected,
    });
  }
  
  // console.log(replicateVars)

  // if (replicateVars.length === 1) {
  //   for (let index = 0; index < eval(replicateVars[0] + 'sSelected').length; index++) {
  //     replicatePlots.push([
  //       eval(replicateVars[0] + 'sSelected')[index]
  //     ]);
  //   }
  //   console.log(replicatePlots);
  // } else if (replicateVars.length === 2) {
  //   for (let i = 0; i < eval(replicateVars[0] + 'sSelected').length; i++) {
  //     for (let j = 0; j < eval(replicateVars[1] + 'sSelected').length; j++) {
  //       replicatePlots.push([
  //         eval(replicateVars[0] + 'sSelected')[i], eval(replicateVars[1] + 'sSelected')[j]
  //       ]);
  //     }
  //   }
  //   console.log(replicatePlots);
    
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
          
          {/* <Heading level={4}>Select Variables</Heading>  */}
          
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
          
          <Box>
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Treatment
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

          { element && treatmentsSelected.length > 0 && depthsSelected.length > 0 && timesSelected.length > 0 &&
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
    
        {showPlot &&
        <Box pad="small">
          <Grid columns={size !== 'small' ? 'medium' : '100%'} gap="small">
            {replicatePlots.map((plot, index) => (       
              <Card key={index}>
                {plot.type === 'bar' &&
                  <BarChartPlot
                    element={element}
                    replicate={replicatePlots[index]}>
                  </BarChartPlot>
                }
                {plot.type === 'heat' &&
                  <HeatMapPlot
                    element={element}
                    replicate={replicatePlots[index]}>
                  </HeatMapPlot>
                }
              </Card>
            ))}
          </Grid>
        </Box>
        }

      </Box>

    </Grid>

  );
}
