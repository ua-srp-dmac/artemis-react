
import React, {createRef, useContext, useState, useEffect} from 'react';

import axios from 'axios';

import 'mathquill/build/mathquill.css';
import math from 'mathjs';

import 'katex/dist/katex.min.css';
import { addStyles, EditableMathField } from 'react-mathquill'

import { InlineMath, BlockMath } from 'react-katex';
import { calculatorButtons } from "./CalculatorButtons";

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

  let operation = []
  let formula = []

  function updateLatexText(symbol) {
    props.latexText.write(symbol)
    props.latexText.keystroke('Enter');
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
                      Use the Latex Editor if you need special operations like sum or product.
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
            value={props.equationSimple}
            onChange={event => props.setEquationSimple(event.target.value)}
          />

          { props.latexDisplay.length > 0 && props.equationSimple.length > 0 &&
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
                    onClick={() => {updateLatexText("-")}}
                    label={button.symbol}
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
