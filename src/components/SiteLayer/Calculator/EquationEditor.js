
import React, {createRef, useContext, useState, useEffect} from 'react';

import axios from 'axios';

import 'mathquill/build/mathquill.css';
import math from 'mathjs';

import 'katex/dist/katex.min.css';
import { addStyles, EditableMathField } from 'react-mathquill'

import { InlineMath, BlockMath } from 'react-katex';
import { calculatorButtons, POWER, FACTORIAL, OPERATORS } from "./CalculatorButtons";
import parse from 'html-react-parser';

import {
  Box,
  Button,
  Text,
  Heading,
  TextInput,
  CheckBox,
  Tip,
  Grid
} from 'grommet';

import {
  CircleInformation
} from 'grommet-icons';

export default function CalculatorComponent(props) {


  const [operations, setOperations] = useState([]);
  const [formula, setFormula] = useState([]);
  const [latexDisplay, setLatexDisplay] = useState("");

  function updateLatexText(symbol) {
    props.latexText.write(symbol)
    props.latexText.keystroke('Enter');
  }

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


  function pressButton(button) {
    
    if (button.type == 'operator' || button.type == 'number') {

        setOperations((prevState) => (
          [...prevState, button.symbol]
        ));
        setFormula((prevState) => (
          [...prevState, button.formula]
        ));
    }

    else if (button.type == 'math_function') {

      let symbol, formula;

      if (button.name == 'factorial') {
          symbol = "!";
          formula = button.formula;

          setOperations((prevState) => (
            [...prevState, symbol]
          ));
          setFormula((prevState) => (
            [...prevState, formula]
          ));
      } else if (button.name == 'power') {
          symbol = "^("
          formula = button.formula

          setOperations((prevState) => (
            [...prevState, symbol]
          ));
          setFormula((prevState) => (
            [...prevState, formula]
          ));
      } else if (button.name == 'square') {
          symbol = "^("
          formula = button.formula

          setOperations((prevState) => (
            [...prevState, symbol, "2)"]
          ));
          setFormula((prevState) => (
            [...prevState, formula, "2)"]
          ));

      } else {
          symbol = button.symbol + "("
          formula = button.formula + "("

          setOperations((prevState) => (
            [...prevState, symbol]
          ));
          setFormula((prevState) => (
            [...prevState, formula]
          ));
      }
    }

    else if (button.type == 'key') {
      if (button.name == 'clear') {
        setOperations([]);
        setFormula([]);

      } else if (button.name == 'delete') {

        setOperations(operations.filter(function(o, i) { 
          return i !== operations.length - 1
        }));
        setFormula(formula.filter(function(o, i) { 
          return i !== formula.length - 1
        }));
      } 
    }

    // when someone presses "=",so when the "=" is pressed by the user,so that must evaluate the result and print it in the div element as shown ↓
    else if (button.type == 'equal') {

      setOperations((prevState) => (
        [...prevState, button.symbol]
      ));
      setFormula((prevState) => (
        [...prevState, button.formula]
      ));
    }

    props.setEquationSimple(operations.join(''))

  }

  // function calculate() {
    
  //   formula_str = data.formula.join('')

  //   // powersearch result will find the indices where the "^" was present,as in case of formula string there was a problem,it would be like : 4mathpow10,which is wrong,so we need to replace that with mathpow(4,10),so we need to update that!,so for that we need the indices of "^",same is the case with "!"

  //   let POWER_SEARCH_RESULT = search(data.formula, POWER)

  //   let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL)

  //   // console.log(POWER_SEARCH_RESULT)


  //   // powerbasegetter function,this function will return the bases which are to be used as exponents!

  //   const BASES = powerbasegetter(data.formula, POWER_SEARCH_RESULT)

  //   // after getting the bases,we're gonna replace those bases,originally it was like : 4pow10 so after getting the bases,the bases list will be having 4 as in this case as the i/p is 4pow10,so we will change this 4pow10 to pow(4,10) which is exaclty what we want!

  //   console.log(BASES)

  //   // this for loop will replace all the power strings having strings like 4pow10 to pow(4,10)..

  //   BASES.forEach(base => {
  //       let toreplace = base + POWER
  //       let replacement = "Math.pow(" + base + ",";

  //       formula_str = formula_str.replace(toreplace, replacement)
  //           // console.log(formula_str)
  //   })


  //   // fixing the factorial count

  //   const NUMBERS = factorialnumgetter(data.formula, FACTORIAL_SEARCH_RESULT)

  //   // console.log(NUMBERS)

  //   // replacing the factorial
  //   NUMBERS.forEach(number => {
  //       // console.log(number.toReplace)
  //       // console.log(number.replacement)
  //       formula_str = formula_str.replace(number.toReplace,
  //           number.replacement)
  //       console.log(formula_str)
  //   })

  //   // this try-catch block is used to check whether the computation is possible or not,so always the try block will be executed the first and if that block throws an error,it is caught by the catch block and the error is checked which type is it and all!

  //   let result

  //   try {
  //       result = eval(formula_str)

  //   } catch (error) {
  //       if (error instanceof SyntaxError) {
  //           result = "SyntaxError"
  //           updateOutputresult(result)
  //           return
  //       }
  //   }

  //   // storing the curretly calculated expression,so that i can use it for further use!

  //   ans = result
  //   data.operations = [result]
  //   data.formula = [result]

  //   updateOutputresult(result)
  //   return
  // }

  
    
  return (
    
    <>      
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
                      Use the Latex Editor if you need special operationss like sum or product.
                    </Text>
                  </Box>
                }
                  dropProps={{ align: { left: 'right' } }}>
                <Button icon={<CircleInformation size="medium" />} />
              </Tip>
            </>
          }
          checked={props.useLatexInput}
          onChange={(event) => props.setUseLatexInput(event.target.checked)}
          toggle
        />

      </Box>
      

      {/* simple equation editor */}
      <Box>
        { props.useLatexInput === false &&
          <> 
          <TextInput
            placeholder="Enter equation"
            value={operations.join('')}
            onChange={event => props.setEquationSimple(event.target.value)}
          />

          { latexDisplay.length > 0 && operations.length > 0 &&
            <BlockMath math={latexDisplay}/>
          }

          { latexDisplay.length === 0 && 
            <Box pad="small"></Box>
          }

          <Box pad="small">

            <Box direction="row-responsive" justify="between" align="center">
              
              

            <Grid 
              columns={{
                count: 5,
                size: 'auto',
              }}
              rows={{
                count: 6,
                size: 'auto',
              }}
              gap="xsmall">

            {calculatorButtons.map((button, i) => {
              return (
                <>
                  <Button
                    size="medium"
                    onClick={() => {pressButton(button)}}
                    label={parse(button.symbol)}
                    >
                  </Button>

                </>
              )
            })}
            </Grid>
            </Box>

          </Box>
          
          </>
        }

        {/* Latex equation editor */}
        { props.useLatexInput === true && 
          <>
          <EditableMathField
            latex={props.equationLatex}
            onChange={(mathField) => {
              props.setEquationLatex(mathField.latex())
              console.log('Editable mathfield changed:', mathField.latex())
            }}
            mathquillDidMount={(mathField) => {
              props.setLatexText(mathField)
            }}
          />


          <Box pad="small">

            <Box direction="row" justify="between" align="center">
              
              <Button
                size="medium"
                onClick={() => {updateLatexText("+")}}
                label={<InlineMath math="+"/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("-")}}
                label={<InlineMath math="-"/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("^{}")}}
                label={<InlineMath math="x^y"/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("^{}")}}
                label={<InlineMath math="\log"/>}
                margin="xsmall">
              </Button>

            </Box>

            <Box direction="row" justify="between" align="center">

              <Button
                size="medium"
                onClick={() => {updateLatexText("\\times") }}
                label={<InlineMath math="\times"/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("\\frac{}{}") }}
                label={<InlineMath math="\div"/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("\\sum") }}
                label={<InlineMath math="\sum"/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("\\sum") }}
                label={<InlineMath math="\ln"/>}
                margin="xsmall">
              </Button>

            </Box>

            <Box direction="row" justify="between" align="center">

              <Button
                size="medium"
                onClick={() => {updateLatexText("\\times") }}
                label={<InlineMath math="x!"/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("\\frac{}{}") }}
                label={<InlineMath math="e"/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("\\sum") }}
                label={<InlineMath math="("/>}
                margin="xsmall">
              </Button>

              <Button
                size="medium"
                onClick={() => {updateLatexText("\\sum") }}
                label={<InlineMath math=")"/>}
                margin="xsmall">
              </Button>

            </Box>

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

    </>
            
        

  );
}
