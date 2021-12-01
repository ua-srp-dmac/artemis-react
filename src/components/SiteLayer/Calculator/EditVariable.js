
import React from 'react';
import ReactSelect from 'react-select';

import {
  Box,
  Button,
  Text,
  Anchor,
  Heading,
  TextInput,
  CheckBox,
  Tip
} from 'grommet';

import {
  Checkmark
} from 'grommet-icons';

export default function CalculatorComponent(props) {

  const treatments = [
    '15% CS',
    '15% C',
    '20% CS',
    '20% C',
    '10% CS',
    'control'
  ];

  const depths1 = [
    '0-20',
    '20-40',
    '40-60',
    '60-90'
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
    if (props.variableValue['treatment' + (i + 1).toString() + '_selected']) {
      treatmentsSelected.push('treatment' + (i + 1).toString());
    }
  }

  for (let i = 0; i < depths1.length; i++ ) {
    if (props.variableValue['depth' + (i + 1).toString() + '_selected']) {
      depthsSelected.push(depths1[i]);
    }
  }

  if (props.variableValue.time0_selected) {
    timesSelected.push(0);
  }
  
  if (props.variableValue.time1_selected) {
    timesSelected.push(1);
  }

  function selectAllTreatments() {
    props.setVariableValue({
      ...props.variableValue,
      treatment1_selected: true,
      treatment2_selected: true,
      treatment3_selected: true,
      treatment4_selected: true,
      treatment5_selected: true,
      treatment6_selected: true,
    });
  }

  function clearTreatments() {
    props.setVariableValue({
      ...props.variableValue,
      treatment1_selected: false,
      treatment2_selected: false,
      treatment3_selected: false,
      treatment4_selected: false,
      treatment5_selected: false,
      treatment6_selected: false,
    });
  }

  function selectAllDepths() {
    props.setVariableValue({
      ...props.variableValue,
      depth1_selected: true,
      depth2_selected: true,
      depth3_selected: true,
      depth4_selected: true,
    });
  }

  function clearDepths() {
    props.setVariableValue({
      ...props.variableValue,
      depth1_selected: false,
      depth2_selected: false,
      depth3_selected: false,
      depth4_selected: false,
    });
  }

  function selectAllTimes() {
    props.setVariableValue({
      ...props.variableValue,
      time0_selected: true,
      time1_selected: true,
    });
  }

  function clearTimes() {
    props.setVariableValue({
      ...props.variableValue,
      time0_selected: false,
      time1_selected: false,
    });
  }  
    
  return (
    
    /* Variable Assignment */
    <>        
      <Heading
        level={4}
        margin={{
          "horizontal": "none",
          "top": "xsmall",
          "bottom": "xsmall",
        }}>
          Assign Variables
      </Heading>

      {/* <Box pad={{bottom: "xsmall"}}> */}
        <Heading
          level={5}
          margin={{
            "horizontal": "none",
            "bottom": "xsmall",
            "top": "xsmall"
          }}>
            Name <Text color={props.variableName.length===0 ? "red": ""}>*</Text>
        </Heading>
        <TextInput
          placeholder="Enter variable name"
          value={props.variableName}
          onChange={event => props.setVariableName(event.target.value)}
        />
      {/* </Box> */}

      <Box pad={{vertical: "small"}}>
        <CheckBox
          checked={props.variableValue.isSolution}
          label="Solve for this variable"
          onChange={(event) => props.setVariableValues({
            ...props.variableValues,
            ['var' + props.selectedVariable]: {
              ...props.variableValues['var' + props.selectedVariable],
              isSolution: event.target.checked
            }
          })}
        />
      </Box>

      {!props.variableValue.isSolution &&
        <>
        <Heading
          level={5}
          margin={{
            "horizontal": "none",
            "top": "xsmall",
            "bottom": "xsmall",
          }}>
            Element <Text color={props.variableValue.elementsSelected.length===0 ? "red": ""}>*</Text>
        </Heading>

        <ReactSelect
          value={props.variableValue.elementsSelected}
          isMulti
          isSearchable
          options={elements}
          className="basic-multi-select"
          onChange={ (selectedOption) => {
            props.setVariableValue({
              ...props.variableValue,
              elementsSelected: selectedOption
            });
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
              Treatment <Text color={treatmentsSelected.length === 0 ? "red": ""}>*</Text>
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
              primary={props.variableValue.treatment6_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  treatment6_selected: !props.variableValue.treatment6_selected
                });
              }}
              size="small"
            />
            <Button
              label="15% C"
              primary={props.variableValue.treatment2_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  treatment2_selected: !props.variableValue.treatment2_selected
                });
              }}
              size="small"
            />
            <Button
              label="20% C"
              primary={props.variableValue.treatment4_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  treatment4_selected: !props.variableValue.treatment4_selected
                });
              }}
              size="small"
            />
          </Box>

          <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>
            <Button
              label="10% CS"
              primary={props.variableValue.treatment5_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  treatment5_selected: !props.variableValue.treatment5_selected
                });
              }}
              size="small"
            />
            <Button
              label="15% CS"
              primary={props.variableValue.treatment1_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  treatment1_selected: !props.variableValue.treatment1_selected
                });
              }}
              size="small"
            />
            <Button
              label="20% CS"
              primary={props.variableValue.treatment3_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  treatment3_selected: !props.variableValue.treatment3_selected
                });
              }}
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
              Depth <Text color={depthsSelected.length === 0 ? "red": ""}>*</Text>

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
              primary={props.variableValue.depth1_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  depth1_selected: !props.variableValue.depth1_selected
                });
              }}
              size="small"
            />
            <Button
              label="20-40"
              primary={props.variableValue.depth2_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  depth2_selected: !props.variableValue.depth2_selected
                });
              }}
              size="small"
            />
            <Button
              label="40-60"
              primary={props.variableValue.depth3_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  depth3_selected: !props.variableValue.depth3_selected
                });
              }}
              size="small"
            />
            <Button
              label="60-90"
              primary={props.variableValue.depth4_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  depth4_selected: !props.variableValue.depth4_selected
                });
              }}
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
              Time <Text color={timesSelected.length === 0 ? "red": ""}>*</Text>
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
              primary={props.variableValue.time0_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  time0_selected: !props.variableValue.time0_selected
                });
              }}
              size="small"
            />
            <Button
              label="Time 1"
              primary={props.variableValue.time1_selected}
              onClick={() => {
                props.setVariableValue({
                  ...props.variableValue,
                  time1_selected: !props.variableValue.time1_selected
                });
              }}
              size="small"
            />
          </Box>
          
        </Box>
        </>
      }

      { props.variableSummary.errors.length > 0 && !props.variableSummary.isSolution &&
        <Box
          pad={{top: "medium"}}>   
          <Text size="small" color="red" weight="bold">Missing input for:</Text>
          <Text size="small" color="red">
            { props.variableSummary.errors.map((e, i) => { 
              return (
                <>
                {i === props.variableSummary.errors.length-1 ?
                  <>
                    {e}
                  </>
                :
                  <>
                    {e},&nbsp;
                  </>
                }
                </>
              );
            })
            }

          </Text>
        </Box>
      }

      { props.variableSummary.isVector === false && props.variableSummary.errors.length === 0 &&
        <Box
          // align="center"
          pad={{top: "medium"}}>
        
          <Text size="small" weight="bold" color="red">Error: Input must be a vector.</Text>

        </Box>
      }

      { props.vectorLengthMatch === false &&  props.variableSummary.isVector && 
        <Box
          // align="center"
          pad={{top: "medium"}}>
        
          <Text size="small" weight="bold" color="red">Error: Vectors must be the same size.</Text>

        </Box>
      }

      <Box
        align="center"
        pad="medium">
      
        <Button label="Save"
          icon={<Checkmark color="plain" />}
          hoverIndicator
          onClick={() => props.setSelectedVariable(null)}
          disabled={ props.variableSummary.isVector == false || props.variableSummary.errors.length }
        />

      </Box>
    </>
  );
}
