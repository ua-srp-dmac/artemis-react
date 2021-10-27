
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


  function updateLatexText(symbol) {
    props.latexText.write(symbol)
    props.latexText.keystroke('Enter');
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
      

      {/* simple equation editor */}
      <Box>
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

          { }

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
                  count: 5,
                  size: 'auto',
                }}
                rows={{
                  count: 6,
                  size: 'auto',
                }}
                gap="xsmall">

              {props.variableButtons.map((button, i) => {
                return (
                  <>
                    <Button
                      size="medium"
                      onClick={() => {pressButton(button)}}
                      label={parse(button.name)}
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
          onClick={() => props.calculate(props.formula)}
        />
      </Box>

    </>
            
        

  );
}
