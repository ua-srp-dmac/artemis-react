
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import 'mathquill/build/mathquill.css';
import math from 'mathjs';
import { BlockMath } from 'react-katex';

import EquationEditor from "./EquationEditor";
import EditVariable from "./EditVariable";
import Solution from './Solution';
import classNames from "classnames";

import {
  Box,
  Button,
  Grid,
  Text,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from 'grommet';

import {
  Add,
  Select,
} from 'grommet-icons';


export default function CalculatorComponent(props) {

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  
  const getData = () => {
    
    axios.get(`${API_ENDPOINT}/site-geochem-points/` + props.site.id)
    .then((response) => {
      const data = response.data.points;
      console.log(data)
      setData(data)
    })
    .catch(error => console.log(error));
  }

  React.useEffect(() => {
    getData();
  }, []);

  // site data points
  const [data, setData] = React.useState(null);
  
  // calculator solution
  const [solution, setSolution] = React.useState(null);
  const [showSolution, setShowSolution] = React.useState(false);
  
  
  // Use Latex input field (Mathquill)
  const [useLatexInput, setUseLatexInput] = useState(false);

  // Latex equation
  const [equationLatex, setEquationLatex] = useState("");
  // Mathquill equation
  const [latexText, setLatexText] = useState('')

  // simple equation editor input
  const [equationSimple, setEquationSimple] = useState("");
  // Latex display for simple equation editor
  const [latexDisplay, setLatexDisplay] = useState("");

  const [operations, setOperations] = useState([]);
  const [formula, setFormula] = useState([]);

  // watch for changes to simple equation text editor and update latex display
  useEffect(() => {
    let newFormula = operations.join("");
    
    try {
      let latex = math.parse(newFormula).toTex()   
      if (latex !== 'undefined') {
        setLatexDisplay(latex);
      }
    } catch(error) {
      console.log(error)
    }
  },[operations])

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
    name:"",
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

  const initialVariableSummary = {
    isSolution: false,
    isVector: null,
    elementsSelected: [],
    treatmentsSelected: [],
    depthsSelected: [],
    timesSelected: [],
    numElements: 0,
    numTreatments: 0,
    numDepths: 0,
    numTimes: 0,
    errors: [],
    name: ""
  }

  const [variables, setVariables] = useState([1]);
  const [vectorLengthMatch, setVectorLengthMatch] = useState(true);

  const [variableValues, setVariableValues] = useState({
    var1: {...initialVariableValue},
    var2: {...initialVariableValue},
    var3: {...initialVariableValue},
    var4: {...initialVariableValue},
    var5: {...initialVariableValue},
  })

  const [variableSummary, setVariableSummary] = useState({
    var1: {...initialVariableSummary},
    var2: {...initialVariableSummary},
    var3: {...initialVariableSummary},
    var4: {...initialVariableSummary},
    var5: {...initialVariableSummary},
  })

  const [variable1_summary, setVariable1_summary] = useState({...initialVariableSummary});
  const [variable2_summary, setVariable2_summary] = useState({...initialVariableSummary});
  const [variable3_summary, setVariable3_summary] = useState({...initialVariableSummary});
  const [variable4_summary, setVariable4_summary] = useState({...initialVariableSummary});
  const [variable5_summary, setVariable5_summary] = useState({...initialVariableSummary});

  useEffect(() => {
    updateVariableSummary(1);
  },[variableValues['var1']]);

  useEffect(() => {
    updateVariableSummary(2);
  },[variableValues['var2']]);

  useEffect(() => {
    updateVariableSummary(3);
  },[variableValues['var3']]);

  useEffect(() => {
    updateVariableSummary(4);
  },[variableValues['var4']]);

  useEffect(() => {
    updateVariableSummary(5);
  },[variableValues['var5']]);


  useEffect(() => {
    checkVectorLength();
  },[
    variableSummary['var1'],
    variableSummary['var2'],
    variableSummary['var3'],
    variableSummary['var4'],
    variableSummary['var5']
  ])

  function updateVariableValue(attribute, value) {
    setVariableValues({
      ...variableValues,
      ['var' + selectedVariable]: {
        ...variableValues['var' + selectedVariable],
        [attribute]: value
      }
    })
  }

  function checkVectorLength() {

    let match = true;

    console.log('no errors');

    for (let i = 0; i < variables.length; i++) {
      for (let j = 0; j < variables.length; j++) {
        if (i !== j ) {

          let var1 = variableSummary['var' + (i+1).toString()];
          let var2 = variableSummary['var' + (j+1).toString()];

          if ((!var1.isSolution || var1.errors.length === 0) && (!var2.isSolution || var2.errors.length === 0)) {
            console.log('comparing')
            if (
              (var1.elementsSelected.length === 1 &&
              var1.depthsSelected.length === 1 &&
              var1.treatmentsSelected.length === 1 &&
              var1.timesSelected.length === 1) ||
              (var2.elementsSelected.length === 1 &&
                var2.depthsSelected.length === 1 &&
                var2.treatmentsSelected.length === 1 &&
                var2.timesSelected.length === 1)
            ) {
              console.log('vector')
            } else {
              if (
                var1.elementsSelected.length === var2.elementsSelected.length &&
                var1.treatmentsSelected.length === var2.treatmentsSelected.length &&
                var1.depthsSelected.length === var2.depthsSelected.length &&
                var1.timesSelected.length === var2.timesSelected.length
              ) {
                console.log('match')
              } else {
                console.log('not a match');
                match = false;
              }
            }
          }
          
        }
      }
      setVectorLengthMatch(match);
    }
  }



  function updateVariableSummary(index) {

    console.log('updating')

    var variableData = variableValues['var' + index];

    console.log(variableData)
    
    let treatmentsSelected = [];
    let depthsSelected = [];
    let timesSelected = [];
    let elementsSelected = variableData.elementsSelected.map(e => e.value);

    for (let i = 1; i <= 6; i++) {
      if (variableData['treatment' + i + '_selected']) {
        treatmentsSelected.push(i);
      }
    }

    for (let i = 1; i <= 4; i++) {
      if (variableData['depth' + i + '_selected']) {
        depthsSelected.push(depths1[i-1]);
      }
    }

    for (let i = 0; i <= 1; i++) {
      if (variableData['time' + i + '_selected']) {
        timesSelected.push(i);
      }
    }

    let errors = []
    let multipleSelected = []

    if (variableData.name.length === 0) {
      errors.push('Name');
    }

    if (elementsSelected.length === 0) {
      errors.push('Element');
    } else if (elementsSelected.length > 1) {
      multipleSelected.push('Element');
    }

    if (treatmentsSelected.length === 0) {
      errors.push('Treatment');
    } else if (treatmentsSelected.length > 1) {
      multipleSelected.push('Treatment');
    }

    if (depthsSelected.length === 0) {
      errors.push('Depth');
    } else if (depthsSelected.length > 1) {
      multipleSelected.push('Depth');
    }

    if (timesSelected.length === 0) {
      errors.push('Time');
    } else if (timesSelected.length > 1) {
      multipleSelected.push('Time');
    }

    let isVector;

    if (multipleSelected.length > 1 ) {
      isVector = false;
    } else {
      isVector = true;
    }

    let newVariableSummary = {
      name: variableData.name,
      treatmentsSelected: treatmentsSelected,
      depthsSelected: depthsSelected,
      timesSelected: timesSelected,
      elementsSelected: elementsSelected,
      numElements: elementsSelected.length,
      numTreatments: treatmentsSelected.length,
      numDepths: depthsSelected.length,
      numTimes: timesSelected.length,
      isSolution: variableData.isSolution,
      errors: errors,
      isVector: isVector
    };

    setVariableSummary({
      ...variableSummary,
      ['var' + index]: newVariableSummary
    })

  }

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
      name: variableValues['var' + (i+1).toString()].name,
      type: "variable"
    })
  }

  function calculateSimple() {
    
    setShowSolution(true);

    // object to store corresponding vectors for variables
    let variableVectors = {}
    
    // name of variable to solve for
    let solutionVar = ""

    for (var i = 0; i < variables.length; i++) {
    
      let variableName = variableValues['var' + (i+1).toString()].name;
      let varSummary = variableSummary['var' + (i+1).toString()];

      if (varSummary.isSolution) {
        solutionVar = variableName;
      } else {
        variableVectors[variableName] = data.filter(function(d, i) { 
          return (
            varSummary.elementsSelected.includes(d.element[0]) &&
            varSummary.depthsSelected.includes(d.depth[0]) &&
            varSummary.treatmentsSelected.includes(d.treatment) &&
            varSummary.timesSelected.includes(d.time)
          );
        })
      }
    }

    let maxVectorLength = 0;

    for (const varName in variableVectors) {
      if (variableVectors[varName].length > maxVectorLength) {
        maxVectorLength = variableVectors[varName].length;
      }
    }

    let equationSimple = operations.join('')

    let requestData = {
      "variableVector": variableVectors,
      "latex": equationSimple,
      "maxVectorLength": maxVectorLength,
      "solutionVar": solutionVar,
    }

    let submission = {
      headers: {
        // Authorization: token,
        'Content-Type': 'application/json'
      },
      data: requestData,
    }

    return axios.get(`${API_ENDPOINT}/simple-calculator`, {params: requestData})
      .then((response) => {
        // console.log(response.data.solution);
        setSolution(response.data.solution);
      })
      .catch(error => {
        setSolution(null);
        console.log(error)
      });

  }

  function calculateLatex() {
    
    setShowSolution(true);

    // object to store corresponding vectors for variables
    let variableVectors = {}
    
    // name of variable to solve for
    let solutionVar = ""

    for (var i = 0; i < variables.length; i++) {
    
      let variableName = variableValues['var' + (i+1).toString()].name;
      let varSummary = variableSummary['var' + (i+1).toString()];

      if (varSummary.isSolution) {
        solutionVar = variableName;
      } else {
        variableVectors[variableName] = data.filter(function(d, i) { 
          return (
            varSummary.elementsSelected.includes(d.element[0]) &&
            varSummary.depthsSelected.includes(d.depth[0]) &&
            varSummary.treatmentsSelected.includes(d.treatment) &&
            varSummary.timesSelected.includes(d.time)
          );
        })
      }
    }

    let maxVectorLength = 0;

    for (const varName in variableVectors) {
      if (variableVectors[varName].length > maxVectorLength) {
        maxVectorLength = variableVectors[varName].length;
      }
    }

    let requestData = {
      "variableVector": variableVectors,
      "latex": equationLatex,
      "maxVectorLength": maxVectorLength,
      "solutionVar": solutionVar,
    }

    let submission = {
      headers: {
        // Authorization: token,
        'Content-Type': 'application/json'
      },
      data: requestData,
    }

    return axios.get(`${API_ENDPOINT}/latex-calculator`, {params: requestData})
      .then((response) => {
        // console.log(response.data.solution);
        setSolution(response.data.solution);
      })
      .catch(
        error => {
          setSolution(null);
          console.log(error)
        });

  }

  return (
    <>
      { showSolution === false &&
    
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
                  { !vectorLengthMatch &&
                    <Text color="red" size="small" weight="bold">
                      Error: Vectors must be same length.
                    </Text>
                  }

                  { variables.map((index, i) => {

                    let varSummary = variableSummary['var' + (i+1).toString()];
                    let elementsSelected = varSummary.elementsSelected;
                    let treatmentsSelected = varSummary.treatmentsSelected;
                    let depthsSelected = varSummary.depthsSelected;
                    let timesSelected = varSummary.timesSelected;
                    let isSolution = varSummary.isSolution;
                    let name = varSummary.name;
                    let errors = varSummary.errors;
                    let isVector = varSummary.isVector;
                    
                    return (
                      <Card key={index}
                        pad="small"
                        margin="small" 
                        gap="medium"
                        border={{
                          color: selectedVariable === index ? "#00739D" : "#D3D3D3",
                          size: selectedVariable === index ? "medium" : "small" ,
                          side: "all"
                        }}   
                        onClick={() => {
                          setSelectedVariable(index);
                        }}
                        className={classNames({
                          activeSegment: selectedVariable === index,
                        })}>
    
                        <CardHeader>
                          <Text weight="bold">
                            { name.length === 0 ? 
                              <>Variable {index}</> 
                            : 
                              varSummary.name
                            }
                          </Text>
                        </CardHeader>
                        
                        <CardBody>

                          {errors.length > 0 && selectedVariable !== index && !isSolution &&
                            <Box 
                            pad={{top: "xsmall"}}
                            >
                            <Text color="red" size="small" weight="bold">
                              Missing required fields:
                            </Text>
                            <Text size="xsmall" color="red">
                              { errors.map((e, i) => { 
                                return (
                                  <>
                                  {i === errors.length-1 ?
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

                          {errors.length === 0 && !isSolution && isVector === false &&
                            <Box pad={{top: "none"}}>
                            <Text color="red" size="small" weight="bold">
                              Error: Variable must be a vector.
                            </Text>
                            {/* <Text size="xsmall" color="red">
                              
                            </Text> */}
                            </Box>
                          }

                          { isSolution &&
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
                                      return (
                                        <>
                                          {element} { k !== elementsSelected.length - 1 && <>&#8226;&nbsp;</>}
                                        </>
                                      );
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
                                    return (
                                      <>
                                        {treatments[treatment-1]} { k !== treatmentsSelected.length - 1 && <>&#8226;&nbsp;</>}
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
                                    return (
                                      <>
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
                                    return (
                                      <>
                                        {time} { k !== timesSelected.length - 1 && <>&#8226;&nbsp;</>}
                                      </>
                                    );
                                  })
                                }
                              </Text>
                            </>
                          }
                          
                        </CardBody>
                      </Card>
                    ); 
                  })}
                </>
              }

              { variables.length < 5 && 
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
                  vectorLengthMatch={vectorLengthMatch}
                  selectedVariable={selectedVariable}
                  setSelectedVariable={setSelectedVariable}
                  variableValues={variableValues}
                  setVariableValues={setVariableValues}
                  updateVariableValue={updateVariableValue}
                  variableValue={variableValues['var' + selectedVariable]}
                  variableSummary={variableSummary['var' + selectedVariable]}>
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
                latexDisplay={latexDisplay}
                setLatexDisplay={setLatexDisplay}
                operations={operations}
                setOperations={setOperations}
                formula={formula}
                setFormula={setFormula}
                calculateLatex={calculateLatex}
                calculateSimple={calculateSimple}
                >
              </EquationEditor>
            </Box>
          </Grid>
        </Box>
      </Grid>
    }

{ showSolution === true &&
    
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
          <Box pad="small" direction="row" justify="between">
            <Text
              level={4}
              margin={{
                "horizontal": "none",
                "bottom": "xsmall",
              }}
              weight="bold">
                Equation
            </Text>
            <Button
              label="Edit"
              // icon={<Edit />}
              size="small"
              color="#316B83"
              primary
              onClick={() => setShowSolution(false)}
            />
          </Box>

          <Box>
            { latexDisplay.length > 0 && operations.length > 0 && useLatexInput === false &&
              <BlockMath math={latexDisplay}/>
            }
            { latexDisplay.length > 0 && useLatexInput === true &&
              <BlockMath math={equationLatex}/>
            }
          </Box>

          { variables.length > 0 && 
            <>
            {variables.map((index, i) => {

              let variableValue = variableValues['var' + (i + 1).toString()];

              let treatmentsSelected = []
              let depthsSelected = []
              let timesSelected = []
              let elementsSelected = variableValue.elementsSelected;

              for (let j = 0; j < treatments.length; j++ ) {
                if (variableValue['treatment' + (j + 1).toString() + '_selected']) {
                  treatmentsSelected.push(treatments[j]);
                }
              }

              for (let j = 0; j < depths1.length; j++ ) {
                if (variableValue['depth' + (j + 1).toString() + '_selected']) {
                  depthsSelected.push(depths1[j]);
                }
              }

              if (variableValue['time0_selected']) {
                timesSelected.push("Time 0");
              }

              if (variableValue['time1_selected']) {
                timesSelected.push("Time 1");
              }

              return (
                <Card key={index}
                  pad="small"
                  margin="small" 
                  gap="medium"
                  // border="medium"
                  border={{
                    color: "#D3D3D3",
                    size: "small" ,
                    // style: "dashed",
                    side: "all"
                  }}>

                  {
                    <>
                      <CardHeader>
                        <Text weight="bold">
                          { variableValue.name.length === 0 ? 
                          
                            <>Variable {index}</> 
                            : 

                            variableValue.name
                          
                          }</Text>

                      </CardHeader>
                      <CardBody>

                        { variableValue.isSolution &&
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

        </Box>
      </Box>
    </Box>

          
    <Box flex
      gridArea="main"
    >
      <Box pad="small">
      <Heading
        level={4}
        margin={{
          "horizontal": "none",
          "top": "small",
          "bottom": "xsmall",
        }}>
          Solution
      </Heading>
      { solution &&

      
        <Solution
          solution={solution}
          variables={variables}
          variableSummary = {variableSummary}
        >
          
        </Solution>
      } 
      { !solution &&
        <Text>There was an error parsing your equation.</Text>
      

      } 
      </Box>
    </Box>

  </Grid>
}
    </>

  );
}
