
import React, {createRef, useContext, useState, useEffect} from 'react';

import axios from 'axios';


import 'mathquill/build/mathquill.css';
import math from 'mathjs';


import EquationEditor from "./EquationEditor";
import EditVariable from "./EditVariable";
import classNames from "classnames";

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
  TextInput,
  RadioButtonGroup,
  CheckBox,
  Tip
} from 'grommet';

import {
  BarChart, Add, AddCircle, Favorite, Calculator, Edit, Checkmark, CircleInformation, Select, Cubes
} from 'grommet-icons';
import { stratify } from 'd3-hierarchy';

export default function CalculatorComponent() {

    // Use Latex input field (Mathquill)
    const [useLatexInput, setUseLatexInput] = useState(false);

    // Latex equation
    const [equationLatex, setEquationLatex] = useState("");
    // Mathquill equation
    const [latexText, setLatexText] = useState('')
  
    // simple equation editor input
    const [equationSimple, setEquationSimple] = useState("");
    // Latex display for simple equation editor
    

    // const [operation, setOperation] = useState([]);
    // const [formula, setFormula] = useState([]);

  // watch for changes to simple equation text editor and update latex display


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

  const initialVariableValue = {
    isSolution: false,
    elementsSelected: [],
    treatment1_selected: false,
    treatment2_selected: false,
    treatment3_selected: false,
    treatment4_selected: false,
    treatment5_selected: false,
    treatment6_selected: false,
    time0_selected: false,
    time1_selected: false,
    depth1_selected: false,
    depth2_selected: false,
    depth3_selected: false,
    depth4_selected: false,
  };

  const [variables, setVariables] = useState([1]);


  const [variable1_name, setVariable1_name] = useState("");
  const [variable2_name, setVariable2_name] = useState("");
  const [variable3_name, setVariable3_name] = useState("");
  const [variable4_name, setVariable4_name] = useState("");
  const [variable5_name, setVariable5_name] = useState("");

  const [variable1_value, setVariable1_value] = useState({
    elementsSelected: [],
    treatment1_selected: false,
    treatment2_selected: false,
    treatment3_selected: false,
    treatment4_selected: false,
    treatment5_selected: false,
    treatment6_selected: false,
    time0_selected: false,
    time1_selected: false,
    depth1_selected: false,
    depth2_selected: false,
    depth3_selected: false,
    depth4_selected: false,
  });

  const [variable2_value, setVariable2_value] = useState({
    elementsSelected: [],
    treatment1_selected: false,
    treatment2_selected: false,
    treatment3_selected: false,
    treatment4_selected: false,
    treatment5_selected: false,
    treatment6_selected: false,
    time0_selected: false,
    time1_selected: false,
    depth1_selected: false,
    depth2_selected: false,
    depth3_selected: false,
    depth4_selected: false,
  });
  
  const [variable3_value, setVariable3_value] = useState({
    elementsSelected: [],
    treatment1_selected: false,
    treatment2_selected: false,
    treatment3_selected: false,
    treatment4_selected: false,
    treatment5_selected: false,
    treatment6_selected: false,
    time0_selected: false,
    time1_selected: false,
    depth1_selected: false,
    depth2_selected: false,
    depth3_selected: false,
    depth4_selected: false,
  });
  
  const [variable4_value, setVariable4_value] = useState({
    elementsSelected: [],
    treatment1_selected: false,
    treatment2_selected: false,
    treatment3_selected: false,
    treatment4_selected: false,
    treatment5_selected: false,
    treatment6_selected: false,
    time0_selected: false,
    time1_selected: false,
    depth1_selected: false,
    depth2_selected: false,
    depth3_selected: false,
    depth4_selected: false,
  });
  
  const [variable5_value, setVariable5_value] = useState({
    elementsSelected: [],
    treatment1_selected: false,
    treatment2_selected: false,
    treatment3_selected: false,
    treatment4_selected: false,
    treatment5_selected: false,
    treatment6_selected: false,
    time0_selected: false,
    time1_selected: false,
    depth1_selected: false,
    depth2_selected: false,
    depth3_selected: false,
    depth4_selected: false,
  });

  const [selectedVariable, setSelectedVariable] = useState(1)

  function selectVariable(index) {

    if (variables.includes(index)) {
      setSelectedVariable(index);
    } else {

      setVariables((prevState) => (
        [...prevState, index]
      ));

      setSelectedVariable(index);
    }
  }

  let variableButtons = []

  for (var i = 0; i < variables.length; i++) {
    variableButtons.push({
      name: eval('variable' + (i+1) + '_name'),
      type: "variable"
    })
  }

  console.log(variableButtons)

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
              level={4}
              margin={{
                "horizontal": "none",
                "top": "xsmall",
                "bottom": "xsmall",
              }}>
                Define Variables

            </Heading>

            { variables.length > 0 && 
              <>
              {variables.map((index, i) => {

                let treatmentsSelected = []
                let depthsSelected = []
                let timesSelected = []
                let elementsSelected = eval('variable' + (i + 1).toString() + '_value.elementsSelected');

                for (let j = 0; j < treatments.length; j++ ) {
                  if (eval('variable' + (i+1) + '_value.treatment' + (j + 1).toString() + '_selected')) {
                    treatmentsSelected.push(treatments[j]);
                  }
                }

                for (let j = 0; j < depths1.length; j++ ) {
                  if (eval('variable' + (i+1) + '_value.depth' + (j + 1).toString() + '_selected')) {
                    depthsSelected.push(depths1[j]);
                  }
                }

                if (eval('variable' + (i+1) + '_value.time0_selected')) {
                  timesSelected.push("Time 0");
                }

                if (eval('variable' + (i+1) + '_value.time1_selected')) {
                  timesSelected.push("Time 1");
                }

                return (
                  <Card key={index}
                    pad="small"
                    margin="small" 
                    gap="medium"
                    // border="medium"
                    border={{
                      color: selectedVariable === index ? "#00739D" : "#D3D3D3",
                      size: selectedVariable === index ? "medium" : "small" ,
                      // style: "dashed",
                      side: "all"
                    }}   
                    onClick={() => {
                      setSelectedVariable(index);
                    }}
                    className={classNames({
                      activeSegment: selectedVariable === index,
                    })}>

                    {
                      <>
                        <CardHeader>
                          <Text weight="bold">
                            { eval("variable" + index + "_name").length === 0 ? 
                            
                              <>Variable {index}</> 
                              : 

                              eval("variable" + index + "_name")
                            
                            }</Text>

                        </CardHeader>
                        <CardBody>

                          {eval('variable' + (i+1) + '_value.isSolution') &&
                            <Box pad={{top: "xsmall"}}>
                              <Text size="small" weight="bold" color="green">Solution</Text>
                            </Box>
                          }

                          { elementsSelected.length > 0 &&
                            <>
                              <Box pad={{top: "xsmall"}}>
                                <Text size="small" weight="bold">
                                  Elements &nbsp; 
                                  <Text weight="normal" size="small">
                                  { elementsSelected.map((element, k) => {
                                    return (<>
                                      {element.label} { k !== elementsSelected.length - 1 && <>&#8226;&nbsp;</>}
                                      </>);
                                    })
                                  }
                                  </Text>
                                  
                                </Text>
                   
                                
                          
                              </Box>
                              
                              
                            </>
                          }

                          { treatmentsSelected.length > 0 &&
                            <>
                              <Box pad={{top: "xsmall"}}>
                                <Text size="small" weight="bold">Treatments</Text>
                              </Box>
                              
                              <Text size="xsmall">
                                { treatmentsSelected.map((treatment, k) => {
                                    return (<>
                                    {treatment} { k !== treatmentsSelected.length - 1 && <>&#8226;&nbsp;</>}
                                    </>);
                                  })
                                }
                              </Text>
                            </>
                          }

                          { depthsSelected.length > 0 &&
                            <>
                              <Box pad={{top: "xsmall"}}>
                                <Text size="small" weight="bold">Depths</Text>
                              </Box>
                              
                              <Text size="xsmall">
                                { depthsSelected.map((depth, k) => {
                                    return (<>
                                    {depth} { k !== depthsSelected.length - 1 && <>&#8226;&nbsp;</>}
                                    </>);
                                  })
                                }
                              </Text>
                            </>
                          }

                          { timesSelected.length > 0 &&
                            <>
                              <Box pad={{top: "xsmall"}}>
                                <Text size="small" weight="bold">Times</Text>
                              </Box>
                              
                              <Text size="xsmall">
                                { timesSelected.map((time, k) => {
                                    return (<>
                                    {time} { k !== timesSelected.length - 1 && <>&#8226;&nbsp;</>}
                                    </>);
                                  })
                                }
                              </Text>
                            </>
                          }
                          
                        </CardBody>
                      </>
                    }

                  </Card>
                ) 
              })}
              </>
            }

            { variables.length < 8 && 
              <>
                <Card pad="small"
                  margin="small"
                  gap="medium"
                  border="medium"
                  onClick={() => {
                    selectVariable(variables.length + 1);
                  }}>

                  <CardBody align="center">
                  <Add></Add>
                  </CardBody>
                </Card>
              </>
            }       

          </Box>
        </Box>
      </Box>

            
      <Box flex
        gridArea="main"
      >
        
        <Grid
            fill="true"
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            align="stretch"
            areas={[
              { name: 'left', start: [0, 0], end: [0, 0] },
              { name: 'right', start: [1, 0], end: [1, 0] },
            ]}>

          {/* Variable Assignment */}
          
          <Box flex
            basis="full"
            gridArea="left"
            width="medium"
            pad="small">

            {
              selectedVariable === null &&
              <>
              <Box pad="small" align="center" margin="large">
                <Select size='large'></Select>
                <Text margin="small" align="center">Create or select a variable on the left.</Text>
              </Box>
              </>
            }

            { selectedVariable !== null && 
              <EditVariable
                selectedVariable={selectedVariable}
                setSelectedVariable={setSelectedVariable}
                variableName={eval("variable" + selectedVariable + "_name")}
                variableValue={eval("variable" + selectedVariable + "_value")}
                setVariableName={eval("setVariable" + selectedVariable + "_name")}
                setVariableValue={eval("setVariable" + selectedVariable + "_value")}>
              </EditVariable>
            }

          </Box>

          {/* Equation Builder */}

          <Box flex
            basis="full"
            gridArea="right"
            width="medium"
            pad="small"
            margin={{left: "large"}}>
            
            
            <EquationEditor

              variables={variables}
              variableButtons={variableButtons}
              useLatexInput={useLatexInput}
              setUseLatexInput={setUseLatexInput} 
              equationLatex={equationLatex}
              setEquationLatex={setEquationLatex}
              latexText={latexText}
              setLatexText={setLatexText} 
              equationSimple={equationSimple}
              setEquationSimple={setEquationSimple}
              // latexDisplay={latexDisplay}
              // setLatexDisplay={setLatexDisplay}
              // operation={operation}
              // setOperation={setOperation}
              // formula={formula}
              // setFormula={setFormula}
              >
            </EquationEditor>
            
          </Box>
        </Grid>

          
  
      </Box>

    </Grid>

  );
}
