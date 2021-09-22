import React, {useContext, useState} from 'react';

import axios from 'axios';

import EquationEditor from "equation-editor-react";
import 'mathquill/build/mathquill.css';
import ReactSelect from 'react-select';

import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Anchor,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Heading,
  ResponsiveContext,
} from 'grommet';

import {
  BarChart, Add, AddCircle
} from 'grommet-icons';

export default function Calculator(props) {

  const size = useContext(ResponsiveContext);
  const [equation1, setEquation1] = useState("y=\\frac{A}{B}");
  const [equation2, setEquation2] = useState("y=A*B");
  const [equation3, setEquation3] = useState("y=");

  const [selectedEquation, setSelectedEquation] = useState(null)
  const [newEquation, setNewEquation] = useState(false)

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

  const [elementsSelectedB, setElementsSelectedB] = React.useState([]);

  const [treatment1_selectedB, set_treatment1_selectedB] = React.useState(false);
  const [treatment2_selectedB, set_treatment2_selectedB] = React.useState(false);
  const [treatment3_selectedB, set_treatment3_selectedB] = React.useState(false);
  const [treatment4_selectedB, set_treatment4_selectedB] = React.useState(false);
  const [treatment5_selectedB, set_treatment5_selectedB] = React.useState(false);
  const [treatment6_selectedB, set_treatment6_selectedB] = React.useState(false);

  const [time0_selectedB, set_time0_selectedB] = React.useState(false);
  const [time1_selectedB, set_time1_selectedB] = React.useState(false);

  const [depth1_selectedB, set_depth1_selectedB] = React.useState(false);
  const [depth2_selectedB, set_depth2_selectedB] = React.useState(false);
  const [depth3_selectedB, set_depth3_selectedB] = React.useState(false);
  const [depth4_selectedB, set_depth4_selectedB] = React.useState(false);

  console.log(equation1)
  console.log(equation2)
  console.log(equation3)

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
          
          <Box>
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Equations 

            
            </Heading>

            <Card pad="small"
              margin="small" 
              gap="medium"
              border="medium" onClick={() => {
                setSelectedEquation(1);
              }}>
              <CardHeader>Molar ratio</CardHeader>
              <CardBody>
              <EquationEditor
              value={equation1}
              onChange={setEquation1}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
            />
                </CardBody>
              

            </Card>

            <Card pad="small"
              margin="small" 
              gap="medium"
              border="medium"
              border="medium" onClick={() => {
                setSelectedEquation(2);
              }}>
            <CardHeader>Equation 2</CardHeader>
              <CardBody>
              <EquationEditor
              value={equation2}
              onChange={setEquation2}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
            />
              </CardBody>
              
            </Card>

            { newEquation === true &&
              <Card pad="small"
                    margin="small"
                    gap="medium"
                    border="medium"border="medium" onClick={() => {
                    setSelectedEquation(3);
                  }}>
                <CardHeader>Equation 3</CardHeader>
                <CardBody>
                <EquationEditor
                  value={equation3}
                  onChange={setEquation3}
                  autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
                  autoOperatorNames="sin cos tan"
                />
                </CardBody>
              </Card>
            }

            

            <Card pad="small"
              margin="small"
              gap="medium"
              border="medium"
              onClick={() => {
                setNewEquation(true);
              }}>

              <CardBody align="center">
              <Add></Add>
              </CardBody>
            </Card>

            

  
          </Box>
        </Box>
      </Box>

            
      <Box flex
        gridArea="main"
      >
        
        <Heading
          level={5}
          margin={{
            "horizontal": "none",
            "top": "medium",
            "bottom": "xsmall",
          }}>
            Set Variables 
        </Heading>

        { selectedEquation === 1 &&
          
          <Grid
              fill="true"
              rows={['auto', 'flex']}
              columns={['auto', 'flex']}
              align="stretch"
              areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'right', start: [1, 0], end: [1, 0] },
              ]}>

            <Box flex
              basis="full"
              gridArea="left"
              width="medium"
              pad="small">

              <Heading
                level={3}
                margin={{
                  "horizontal": "none",
                  "top": "xsmall",
                  "bottom": "xsmall",
                }}>
                  A
              </Heading> 
              <Heading
                level={5}
                margin={{
                  "horizontal": "none",
                  "top": "xsmall",
                  "bottom": "xsmall",
                }}>
                  Element
              </Heading>

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

            </Box>

            <Box flex
              basis="full"
              gridArea="right"
              width="medium"
              pad="small">
              <Heading
                level={3}
                margin={{
                  "horizontal": "none",
                  "top": "xsmall",
                  "bottom": "xsmall",
                }}>
                  B 
              </Heading> 
              <Heading
                level={5}
                margin={{
                  "horizontal": "none",
                  "top": "xsmall",
                  "bottom": "xsmall",
                }}>
                  Element
              </Heading>

              <ReactSelect
                value={elementsSelectedB}
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
                    
                </Heading>

                <Box direction="row" align="center" gap="small" >     
                  <Button
                    label="Control"
                    primary={treatment6_selectedB}
                    onClick={() => {set_treatment6_selectedB(!treatment6_selectedB)}}
                    size="small"
                  />
                  <Button
                    label="15% C"
                    primary={treatment2_selectedB}
                    onClick={() => {set_treatment2_selectedB(!treatment2_selectedB)}}
                    size="small"
                  />
                  <Button
                    label="20% C"
                    primary={treatment4_selectedB}
                    onClick={() => {set_treatment4_selectedB(!treatment4_selectedB)}}
                    size="small"
                  />
                </Box>

                <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>
                  <Button
                    label="10% CS"
                    primary={treatment5_selectedB}
                    onClick={() => {set_treatment5_selectedB(!treatment5_selectedB)}}
                    size="small"
                  />
                  <Button
                    label="15% CS"
                    primary={treatment1_selectedB}
                    onClick={() => {set_treatment1_selectedB(!treatment1_selectedB)}}
                    size="small"
                  />
                  <Button
                    label="20% CS"
                    primary={treatment3_selectedB}
                    onClick={() => {set_treatment3_selectedB(!treatment3_selectedB)}}
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
                    primary={depth1_selectedB}
                    onClick={() => {set_depth1_selectedB(!depth1_selectedB)}}
                    size="small"
                  />
                  <Button
                    label="20-40"
                    primary={depth2_selectedB}
                    onClick={() => {set_depth2_selectedB(!depth2_selectedB)}}
                    size="small"
                  />
                  <Button
                    label="40-60"
                    primary={depth3_selectedB}
                    onClick={() => {set_depth3_selectedB(!depth3_selectedB)}}
                    size="small"
                  />
                  <Button
                    label="60-90"
                    primary={depth4_selectedB}
                    onClick={() => {set_depth4_selectedB(!depth4_selectedB)}}
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
                    primary={time0_selectedB}
                    onClick={() => {set_time0_selectedB(!time0_selectedB)}}
                    size="small"
                  />
                  <Button
                    label="Time 1"
                    primary={time1_selectedB}
                    onClick={() => {set_time1_selectedB(!time1_selectedB)}}
                    size="small"
                  />
                </Box>
              </Box>

              <Box
                align="center"
                pad="large">
                <Button
                  label="Calculate"
                  color="neutral-1"
                  primary
                />
              </Box>

              
            </Box>
          </Grid>

          
        }
  
      </Box>

    </Grid>

  );
}
