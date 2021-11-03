
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import 'mathquill/build/mathquill.css';
import math from 'mathjs';
import { BlockMath } from 'react-katex';

import EquationEditor from "./EquationEditor";
import EditVariable from "./EditVariable";
import classNames from "classnames";

import {
  POWER,
  FACTORIAL,
  search,
  powerbasegetter,
  factorialnumgetter,
  factorial,
} from "./CalculatorHelpers";

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

  const getData = () => {
    axios.get('https://artemis-dev.pharmacy.arizona.edu/site-geochem-points/' + props.site.id)
    .then((response) => {
      const data = response.data.points;
      setData(data)
    })
    .catch(error => console.log(error));
  }

  React.useEffect(() => {
    getData();
  }, []);
  
  const [solution, setSolution] = React.useState({});
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState(null)
  
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
    elementsSelected: [],
    treatmentsSelected: [],
    depthsSelected: [],
    timesSelected: [],
    errors: [],
    name: ""
  }


  const [variables, setVariables] = useState([1]);

  const [variable1_name, setVariable1_name] = useState("");
  const [variable2_name, setVariable2_name] = useState("");
  const [variable3_name, setVariable3_name] = useState("");
  const [variable4_name, setVariable4_name] = useState("");
  const [variable5_name, setVariable5_name] = useState("");

  const [variable1_value, setVariable1_value] = useState({...initialVariableValue});
  const [variable2_value, setVariable2_value] = useState({...initialVariableValue});
  const [variable3_value, setVariable3_value] = useState({...initialVariableValue});
  const [variable4_value, setVariable4_value] = useState({...initialVariableValue});
  const [variable5_value, setVariable5_value] = useState({...initialVariableValue});

  const [variable1_summary, setVariable1_summary] = useState({...initialVariableSummary});
  const [variable2_summary, setVariable2_summary] = useState({...initialVariableSummary});
  const [variable3_summary, setVariable3_summary] = useState({...initialVariableSummary});
  const [variable4_summary, setVariable4_summary] = useState({...initialVariableSummary});
  const [variable5_summary, setVariable5_summary] = useState({...initialVariableSummary});

  useEffect(() => {
    updateVariableSummary(1);
  },[variable1_value]);

  useEffect(() => {
    updateVariableSummary(2);
  },[variable2_value]);

  useEffect(() => {
    updateVariableSummary(3);
  },[variable3_value]);

  useEffect(() => {
    updateVariableSummary(4);
  },[variable4_value]);

  useEffect(() => {
    updateVariableSummary(5);
  },[variable5_value]);


  function updateVariableSummary(index) {


    let variableData = eval('variable' + index + '_value');
    
    let treatmentsSelected = [];
    let depthsSelected = [];
    let timesSelected = [];
    let elementsSelected = variableData.elementsSelected.map(e => e.value);

    for (let i = 1; i <= 6; i++) {
      if (variableData['treatment' + i + '_selected']) {
        treatmentsSelected.push(treatments[i-1]);
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

    if (eval("variable" + index + "_name").length === 0) {
      errors.push('Name');
    }

    if (elementsSelected.length === 0) {
      errors.push('Element');
    }

    if (treatmentsSelected.length === 0) {
      errors.push('Treatment');
    }

    if (depthsSelected.length === 0) {
      errors.push('Depth');
    }

    if (timesSelected.length === 0) {
      errors.push('Time');
    }

    let variableSummary = {
      name: eval('variable' + index + '_name'),
      treatmentsSelected: treatmentsSelected,
      depthsSelected: depthsSelected,
      timesSelected: timesSelected,
      elementsSelected: elementsSelected,
      isSolution: variableData.isSolution,
      errors: errors
    };

    console.log(variableSummary)

    eval('setVariable' + index + '_summary')(variableSummary);

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
      name: eval('variable' + (i+1) + '_name'),
      type: "variable"
    })
  }

  function calculate(formula) {
     
    setShowSolution(true);

    // object to store corresponding vectors for variables
    let variableVectors = {}
    
    // name of variable to solve for
    let solutionVar = ""

    for (var i = 0; i < variables.length; i++) {
    
      let variableName = eval('variable' + (i+1) + '_name');
      let variableData = eval('variable' + (i+1) + '_value');

      if (variableData.isSolution) {
        solutionVar = variableName;
      } else {

        let selectedTreatments = [];
        let selectedDepths = [];
        let selectedTimes = [];
        let selectedElements = variableData.elementsSelected.map(e => e.value);

        for (var j=1; j <= 6; j++) {
          if (variableData['treatment' + j + '_selected']) {
            selectedTreatments.push(j);
          }
        }

        for (var j=1; j <= 4; j++) {
          if (variableData['depth' + j + '_selected']) {
            selectedDepths.push(depths1[j-1]);
          }
        }

        for (var j=0; j <= 1; j++) {
          if (variableData['time' + j + '_selected']) {
            selectedTimes.push(j);
          }
        }
        // console.log(selectedTreatments)
        // console.log(selectedDepths)
        // console.log(selectedTimes)
        // console.log(selectedElements)

        variableVectors[variableName] = data.filter(function(d, i) { 
          return (
            selectedElements.includes(d.element[0]) &&
            selectedDepths.includes(d.depth[0]) &&
            selectedTreatments.includes(d.treatment) &&
            selectedTimes.includes(d.time)
          );
        })
      }
    }

    console.log(variableVectors)

    let formula_str;
    let formula_copy;

    if (formula[0]=== solutionVar && formula[1] === "=") {
      formula_copy = formula.slice(2);
      formula_str = formula_copy.join('')
      
    } else {
      formula_str = formula.join('')
      formula_copy = formula.slice()
    }

    console.log(formula_str)
    console.log(formula_copy)

    // search for elements containingf
    let POWER_SEARCH_RESULT = search(formula_copy, POWER)
    

    const BASES = powerbasegetter(formula_copy, POWER_SEARCH_RESULT)
    console.log(BASES)

    // 4pow10 --> pow(4,10) 

    BASES.forEach(base => {
        let toreplace = base + POWER
        let replacement = "Math.pow(" + base + ",";

        formula_str = formula_str.replace(toreplace, replacement)
        // console.log(formula_str)
    })

    let FACTORIAL_SEARCH_RESULT = search(formula_copy, FACTORIAL)
    const NUMBERS = factorialnumgetter(formula_copy, FACTORIAL_SEARCH_RESULT)

    console.log(NUMBERS)

    // replacing the factorial
    NUMBERS.forEach(number => {
        // console.log(number.toReplace)
        // console.log(number.replacement)
        formula_str = formula_str.replace(number.toReplace,
            number.replacement)
        console.log(formula_str)
    })


    // this try-catch block is used to check whether the computation is possible or not,so always the try block will be executed the first and if that block throws an error,it is caught by the catch block and the error is checked which type is it and all!

    let solutions = [];

    if (Object.keys(variableVectors).length === 0) {
      try {  
        let result = eval(formula_str)
        solutions.push({solution: result});
      } catch (error) {
        if (error instanceof SyntaxError) {
          let result = "SyntaxError"
          solutions.push({solution: result});
        }
      }
    } else {

    
      for (const varName in variableVectors) {
        let vector = variableVectors[varName];
        for (var i = 0; i < vector.length; i++) {
          let result = Object.assign({}, vector[i]);
          // console.log(result)

          let formulaCopy = formula_str.slice();
          formulaCopy = formulaCopy.replaceAll(varName, vector[i].element_amount);
          
          console.log(formulaCopy)
          
          try {
            
            let ans = eval(formulaCopy)
            result['solution'] = ans
            solutions.push(result);
          } catch (error) {
            if (error instanceof SyntaxError) {
              let result = "SyntaxError"
              solutions.push(result);
            }
          }

        }   
      }
    }

    console.log(solutions); 
    setSolution(solutions)
    

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
                  { variables.map((index, i) => {

                    let varSummary = eval('variable' + (i+1) + '_summary');
                    let elementsSelected = varSummary.elementsSelected;
                    let treatmentsSelected = varSummary.treatmentsSelected;
                    let depthsSelected = varSummary.depthsSelected;
                    let timesSelected = varSummary.timesSelected;
                    let isSolution = varSummary.isSolution;
                    let name = varSummary.name;
                    let errors = varSummary.errors;
                    
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
                              eval("variable" + index + "_name")
                            }
                          </Text>
                        </CardHeader>
                        
                        <CardBody>

                          {errors.length > 0 && selectedVariable !== index && !isSolution &&
                            <Box pad={{top: "xsmall"}}>
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
                calculate={calculate}
                latexDisplay={latexDisplay}
                setLatexDisplay={setLatexDisplay}
                operations={operations}
                setOperations={setOperations}
                formula={formula}
                setFormula={setFormula}
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
            { latexDisplay.length > 0 && operations.length > 0 &&
              <BlockMath math={latexDisplay}/>
            }
          </Box>

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
                    color: "#D3D3D3",
                    size: "small" ,
                    // style: "dashed",
                    side: "all"
                  }}>

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
      {solution.map((d, i) => {
        return (
          <Text>{d.solution}</Text>
        )
      })}
      </Box>
    </Box>

  </Grid>
}
    </>

  );
}
