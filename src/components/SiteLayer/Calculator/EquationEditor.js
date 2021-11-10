
import React from 'react';

import 'mathquill/build/mathquill.css';
import 'katex/dist/katex.min.css';
import { EditableMathField } from 'react-mathquill'

import { InlineMath, BlockMath } from 'react-katex';
import { calculatorButtons, latexButtons } from './Buttons';
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


  function updateLatexText(button) {
    if (button.type === 'key') {
      props.latexText.keystroke(button.formula)
    } 
    else if (button.type === "sum") {
      props.latexText.write(button.formula)
    } else {
      props.latexText.typedText(button.formula)
    }
    
  }


  function pressButton(button) {
    
    if (button.type == 'operator' || button.type == 'number') {
      props.setOperations((prevState) => (
        [...prevState, button.formula]
      ));
      props.setFormula((prevState) => (
        [...prevState, button.formula]
      ));
    }

    else if (button.type == 'e') {
      props.setOperations((prevState) => (
        [...prevState, button.symbol]
      ));
      props.setFormula((prevState) => (
        [...prevState, button.formula]
      ));
    }

    else if (button.type == 'variable') {

      props.setOperations((prevState) => (
        [...prevState, button.name]
      ));
      props.setFormula((prevState) => (
        [...prevState, button.name]
      ));
    }

    else if (button.type == 'math_function') {

      let symbol, formula;

      if (button.name == 'factorial') {
          symbol = "!";
          formula = button.formula;

          props.setOperations((prevState) => (
            [...prevState, symbol]
          ));
          props.setFormula((prevState) => (
            [...prevState, formula]
          ));
      } else if (button.name == 'power') {
          symbol = "^("
          formula = button.formula

          props.setOperations((prevState) => (
            [...prevState, symbol]
          ));
          props.setFormula((prevState) => (
            [...prevState, formula]
          ));
      } else if (button.name == 'square') {
          symbol = "^("
          formula = button.formula

          props.setOperations((prevState) => (
            [...prevState, symbol, "2)"]
          ));
          props.setFormula((prevState) => (
            [...prevState, formula, "2)"]
          ));

      } else {
          symbol = button.symbol + "("
          formula = button.formula + "("

          props.setOperations((prevState) => (
            [...prevState, symbol]
          ));
          props.setFormula((prevState) => (
            [...prevState, formula]
          ));
      }
    }

    else if (button.type == 'key') {
      if (button.name == 'clear') {
        props.setOperations([]);
        props.setFormula([]);

      } else if (button.name == 'delete') {

        props.setOperations(props.operations.filter(function(o, i) { 
          return i !== props.operations.length - 1
        }));
        props.setFormula(props.formula.filter(function(o, i) { 
          return i !== props.formula.length - 1
        }));
      } 
    }

    // when someone presses "=",so when the "=" is pressed by the user,so that must evaluate the result and print it in the div element as shown ↓
    else if (button.type == 'equal') {

      props.setOperations((prevState) => (
        [...prevState, button.symbol]
      ));
      props.setFormula((prevState) => (
        [...prevState, button.formula]
      ));
    }

    props.setEquationSimple(props.operations.join(''))

  }
    
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
      

      
      <Box pad={{top: "medium"}}>

        {/* simple equation editor */}
        { props.useLatexInput === false &&
          <> 
          <TextInput
            placeholder="Enter equation"
            value={props.operations.join('')}
            onChange={event => props.setEquationSimple(event.target.value)}
          />

          { props.latexDisplay.length > 0 && props.operations.length > 0 &&
            <BlockMath math={props.latexDisplay}/>
          }

          { props.latexDisplay.length === 0 && 
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
                  count: 5,
                  size: 'auto',
                }}
                gap="xsmall">

              {calculatorButtons.map((button, i) => {
                return (
                  <>
                    <Button
                      color={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(button.formula) ? '#AEC9D1' : button.formula === '=' ? '#3594B5' : "#C7D9DE"}
                      size="medium"
                      onClick={() => {pressButton(button)}}
                      label={parse(button.symbol)}
                      primary
                      >
                    </Button>

                  </>
                )
              })}
              </Grid>
            </Box>
          </Box>

          <Box pad="small">

          <Heading
            level={4}
            margin={{
              "horizontal": "none",
              "top": "xsmall",
              "bottom": "xsmall",
            }}>
              Variables
          </Heading> 

            <Box direction="row-responsive" justify="between" align="center">
              <Grid 
                columns={{
                  count: 3,
                  size: 'auto',
                }}
                rows={{
                  count: 2,
                  size: 'auto',
                }}
                gap="xsmall">

              {props.variableButtons.map((button, i) => {
                return (
                  <>
                    <Button
                      color="#3594B5"
                      primary
                      size="medium"
                      onClick={() => {pressButton(button)}}
                      label={button.name ? parse(button.name) : 'Var ' + (i+1)}
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
              config={{
                substituteTextarea: function() {
                  return document.createElement('textarea');
                },}}
            />

            <Box pad={{vertical: "medium"}}>

              <Box direction="row-responsive" justify="between" align="center">
                <Grid 
                  columns={{
                    count: 5,
                    size: 'auto',
                  }}
                  rows={{
                    count: 5,
                    size: 'auto',
                  }}
                  gap="xsmall">

                { latexButtons.map((button, i) => {
                  return (
                    <>
                      <Button
                        color={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(button.formula) ? '#AEC9D1' : button.formula === '=' ? '#3594B5' : "#C7D9DE"}
                        size="medium"
                        // onClick={() => {pressButton(button)}}
                        onClick={() => {updateLatexText(button)}}
                        label={parse(button.symbol)}
                        primary
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
      </Box>
      
      <Box
        align="center"
        pad="large">
        <Button
          label="Calculate"
          color="neutral-1"
          primary
          onClick={() => {
            if (props.useLatexInput === true) {
              props.calculateLatex(props.formula);
            } else {
              props.calculate(props.formula);
            }
            
          }}
        />
      </Box>

    </>
            
        

  );
}
