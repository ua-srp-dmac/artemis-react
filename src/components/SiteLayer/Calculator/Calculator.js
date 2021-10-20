
import React, {createRef, useContext, useState, useEffect} from 'react';

import axios from 'axios';

import EquationEditor from "equation-editor-react";
import 'mathquill/build/mathquill.css';
import ReactSelect from 'react-select';
import { addStyles, EditableMathField } from 'react-mathquill'
import MathExpression from 'math-expressions';
import algebra from 'algebra.js';
import math from 'mathjs';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';


import MathDrop from "./MathDrop";
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

export default function CalculatorComponent() {

  const [equationLatex, setEquationLatex] = useState("");
  const [equationText, setEquationText] = useState("");
  const [text, setText] = useState('')
  const [useLatexInput, setUseLatexInput] = useState(false);
  const [latexDisplay, setLatexDisplay] = useState("");

  useEffect(() => {
    try {
      let latex = math.parse(equationText).toTex()   
      if (latex !== 'undefined') {
        setLatexDisplay(latex);
      }
    } catch(error) {
      console.log(error)
    }
  },[equationText]) // <-- here put the parameter to listen

  const [variables, setVariables] = useState([1]);

  const [variable1_name, setVariable1_name] = useState("");
  const [variable2_name, setVariable2_name] = useState("");
  const [variable3_name, setVariable3_name] = useState("");
  const [variable4_name, setVariable4_name] = useState("");
  const [variable5_name, setVariable5_name] = useState("");

  const [variable1_value, setVariable1_value] = useState({});
  const [variable2_value, setVariable2_value] = useState({});
  const [variable3_value, setVariable3_value] = useState({});
  const [variable4_value, setVariable4_value] = useState({});
  const [variable5_value, setVariable5_value] = useState({});

  const [selectedVariable, setSelectedVariable] = useState(1)
  
  function updateEquation1(symbol) {
    text.write(symbol)
    text.keystroke('Enter');
  }

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


                    { selectedVariable !== index &&
                      <>
                        <CardHeader>
                          <Text>Variable {index}</Text>
                          {/* <Button icon={<Edit color="plain" />}
                            hoverIndicator
                            onClick={() => {
                              setSelectedVariable(index);
                            }}
                          /> */}
                        </CardHeader>
                        <CardBody>
                          <Text>{eval("variable" + index + "_name")}</Text>
                        </CardBody>
                      </>
                    }

                    { selectedVariable === index &&
                      <>
                        <CardHeader>
                          <Text>Variable {index}</Text>
                        </CardHeader>
                        <CardBody>
                        {/* <Box pad={{vertical: "small"}}>
                          <TextInput
                            placeholder="Enter variable name"
                            value={eval("variable"+index)}
                            onChange={event => eval("setVariable" + index)(event.target.value)}
                          />
                        </Box> */}
                        </CardBody>

                        <CardFooter pad={{horizontal: "small"}} background="light-2">
                          
                        </CardFooter>
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
            pad="small">
            <Heading
              level={4}
              margin={{
                "horizontal": "none",
                "top": "xsmall",
                "bottom": "xsmall",
              }}>
                Build Equation
                
            </Heading> 
            
            <Box pad={{vertical: "medium"}}>
              <CheckBox label={
                  <>
                    <Text>Latex Editor</Text>
                    <Tip content={
                        <Box
                          pad="small"
                          gap="small"
                          width={{ max: 'small' }}
                          round="small"
                          background="background-front"
                          responsive={false}
                        >
                          <Text weight="bold">Latex Editor</Text>
                          <Text size="small">
                            Use the Latex Editor if you need special operations like sum or product.
                          </Text>
                        </Box>
                      }
                        dropProps={{ align: { left: 'right' } }}>
                      <Button icon={<CircleInformation size="medium" />} />
                    </Tip>
                  </>
                }
                checked={useLatexInput}
                onChange={(event) => setUseLatexInput(event.target.checked)}
                toggle
              />
    
            </Box>

            <Box >
              { useLatexInput === false &&
                <> 
                <TextInput
                  placeholder="Enter equation"
                  value={equationText}
                  onChange={event => setEquationText(event.target.value)}
                />

                { latexDisplay.length > 0 && equationText.length > 0 &&
                  <BlockMath math={latexDisplay}/>
                }

                { latexDisplay.length === 0 && 
                  <Box pad="small"></Box>
                }
                
                </>
              }
              
              { useLatexInput === true && 
                <>
                <EditableMathField
                  // className="mathquill-example-field"
                  latex={equationLatex}
                  onChange={(mathField) => {
                    setEquationLatex(mathField.latex())
                    // setText(mathField.text())
                    console.log('Editable mathfield changed:', mathField.latex())
                  }}
                  mathquillDidMount={(mathField) => {
                    setText(mathField)
                  }}
                />
                <Box pad={{vertical: "medium"}}>
                  <MathDrop updateEquation1={updateEquation1}></MathDrop>
                </Box>
                </>
              }
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

          
  
      </Box>

    </Grid>

  );
}
