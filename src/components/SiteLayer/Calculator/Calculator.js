
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


  function calculate(formula) {
     
    setShowSolution(true);

    let variableVectors = {}

    for (var i; i<variables.length; i++) {
      let variableName = eval('variable' + (i+1) + '_names');
      let variableData = data.filter()
    }
    
    let formula_str = formula.join('')

    // search for elements containingf
    let POWER_SEARCH_RESULT = search(formula, POWER)
    let FACTORIAL_SEARCH_RESULT = search(formula, FACTORIAL)


    const BASES = powerbasegetter(formula, POWER_SEARCH_RESULT)

    // after getting the bases,we're gonna replace those bases,originally it was like : 4pow10 so after getting the bases,the bases list will be having 4 as in this case as the i/p is 4pow10,so we will change this 4pow10 to pow(4,10) which is exaclty what we want!

    console.log(BASES)

    // this for loop will replace all the power strings having strings like 4pow10 to pow(4,10)..

    BASES.forEach(base => {
        let toreplace = base + POWER
        let replacement = "Math.pow(" + base + ",";

        formula_str = formula_str.replace(toreplace, replacement)
            // console.log(formula_str)
    })


    // fixing the factorial count

    const NUMBERS = factorialnumgetter(data.formula, FACTORIAL_SEARCH_RESULT)

    // console.log(NUMBERS)

    // replacing the factorial
    NUMBERS.forEach(number => {
        // console.log(number.toReplace)
        // console.log(number.replacement)
        formula_str = formula_str.replace(number.toReplace,
            number.replacement)
        console.log(formula_str)
    })

    // this try-catch block is used to check whether the computation is possible or not,so always the try block will be executed the first and if that block throws an error,it is caught by the catch block and the error is checked which type is it and all!

    let result

    try {
        result = eval(formula_str)

    } catch (error) {
        if (error instanceof SyntaxError) {
            result = "SyntaxError"
            setSolution(result)
            return
        }
    }

    // storing the curretly calculated expression,so that i can use it for further use!

    let ans = result
    data.operations = [result]
    data.formula = [result]

    setSolution(result)
    return
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
      {solution}
      </Box>
    </Box>

  </Grid>
}
    </>

  );
}
