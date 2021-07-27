import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import classNames from 'classnames';

import PlotReplicate from './PlotReplicate';

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

  const size = useContext(ResponsiveContext);


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

  if (showPlot) {
    let treatmentsSelected = []
    let depthsSelected = []
    let timesSelected = []
    let replicateVars = []

    if (!selectedVars.includes('treatment')) {
      replicateVars.push('treatment');
      if (treatment1_selected) {
        treatmentsSelected.push('treatment1');
      }
      if (treatment2_selected) {
        treatmentsSelected.push('treatment2');
      }
      if (treatment3_selected) {
        treatmentsSelected.push('treatment3');
      }
      if (treatment4_selected) {
        treatmentsSelected.push('treatment4');
      }
      if (treatment5_selected) {
        treatmentsSelected.push('treatment5');
      }
      if (treatment6_selected) {
        treatmentsSelected.push('treatment6');
      }
    }

    if (!selectedVars.includes('depth')) {
      replicateVars.push('depth');
      if (depth1_selected) {
        depthsSelected.push('depth1');
      }
      if (depth2_selected) {
        depthsSelected.push('depth2');
      }
      if (depth3_selected) {
        depthsSelected.push('depth3');
      }
      if (depth4_selected) {
        depthsSelected.push('depth4');
      }
    }

    if (!selectedVars.includes('time')) {
      replicateVars.push('time');
      if (time0_selected) {
        timesSelected.push('time0');
      }
      if (time1_selected) {
        timesSelected.push('time1');
      }
    }

    var replicatePlots = []
    console.log(replicateVars)

    if (replicateVars.length === 1) {
      for (let index = 0; index < eval(replicateVars[0] + 'sSelected').length; index++) {
        replicatePlots.push([
          eval(replicateVars[0] + 'sSelected')[index]
        ]);
      }
      console.log(replicatePlots);
    } else if (replicateVars.length === 2) {
      for (let i = 0; i < eval(replicateVars[0] + 'sSelected').length; i++) {
        for (let j = 0; j < eval(replicateVars[1] + 'sSelected').length; j++) {
          replicatePlots.push([
            eval(replicateVars[0] + 'sSelected')[i], eval(replicateVars[1] + 'sSelected')[j]
          ]);
        }
      }
      console.log(replicatePlots);
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
    
        {showPlot &&
        <Box pad="small">
          <Grid columns={size !== 'small' ? 'medium' : '100%'} gap="small">
            {replicatePlots.map((plot, index) => (
              
              <Card key={index}>
                <PlotReplicate element={element} selectedVars={selectedVars} replicate={replicatePlots[index]}></PlotReplicate>
              </Card>
            ))}
          </Grid>
        </Box>
}

      </Box>

    </Grid>

  );
}
