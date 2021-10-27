
import React, {createRef, useContext, useState, useEffect} from 'react';

import axios from 'axios';

import { calculatorButtons, POWER, FACTORIAL, OPERATORS, search, powerbasegetter, factorialnumgetter } from "./CalculatorButtons";

import 'mathquill/build/mathquill.css';
import math from 'mathjs';
import { InlineMath, BlockMath } from 'react-katex';


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

export default function CalculatorComponent(props) {

  const getData = () => {
    axios.get('https://artemis-dev.pharmacy.arizona.edu/site-geochem-points/' + props.site.id)
    .then((response) => {
      const data = response.data.points;
      setData(data)
      console.log(data);
    })
    .catch(error => console.log(error));
  }
  
  const [solution, setSolution] = React.useState({});
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState(null)
  
  React.useEffect(() => {
    getData();
  }, []);

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
    console.log(newFormula)
    
    try {
      let latex = math.parse(newFormula).toTex()   
      if (latex !== 'undefined') {
        setLatexDisplay(latex);
        console.log(latex)
      }
    } catch(error) {
      console.log(error)
    }
  },[operations]) // <-- here put the parameter to listen

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

  function factorial(number) {

    // if the number is decimal like 0.5! or so then call the gamma function

    if (number % 1 != 0) {

        return gamma(number + 1)

    }

    if (number == 0 || number == 1) {
        return 1
    }

    let result = 1

    for (let i = 1; i <= number; i++) {
        result *= i
    }
    if (result == Infinity) {
        return Infinity
    }

    return result
}

function gamma(n) { // accurate to about 15 decimal places
  //some magic constants 
  var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
      p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
      n--;
      var x = p[0];
      for (var i = 1; i < g + 2; i++) {
          x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
  }
}


  function calculate(formula) {
     
    setShowSolution(true);

    let variableVectors = {}
    let solutionVar = ""

    for (var i=0; i < variables.length; i++) {
    
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

    if (formula[0]===solutionVar && formula[1] === "=") {
      formula_str = formula.join('').substring(2)
      formula.splice(0, 2);
    } else {
      formula_str = formula.join('')
    }

    console.log(formula_str)
    console.log(formula)

    // search for elements containingf
    let POWER_SEARCH_RESULT = search(formula, POWER)
    let FACTORIAL_SEARCH_RESULT = search(formula, FACTORIAL)

    console.log(FACTORIAL_SEARCH_RESULT)

    const BASES = powerbasegetter(formula, POWER_SEARCH_RESULT)
    console.log(BASES)

    // 4pow10 --> pow(4,10) 

    BASES.forEach(base => {
        let toreplace = base + POWER
        let replacement = "Math.pow(" + base + ",";

        formula_str = formula_str.replace(toreplace, replacement)
        // console.log(formula_str)
    })

    const NUMBERS = factorialnumgetter(data.formula, FACTORIAL_SEARCH_RESULT)

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
