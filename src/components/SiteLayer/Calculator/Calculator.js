import React, {useContext, useState} from 'react';

import axios from 'axios';

import EquationEditor from "equation-editor-react";
import 'mathquill/build/mathquill.css';

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
} from 'grommet';

import {
  BarChart, Add, AddCircle
} from 'grommet-icons';

export default function Calculator(props) {

  const size = useContext(ResponsiveContext);
  const [equation1, setEquation1] = useState("y=\\frac{A}{B}");
  const [equation2, setEquation2] = useState("y=A*B");
  const [equation3, setEquation3] = useState("y=x");

  console.log(equation1)
  console.log(equation2)
  console.log(equation3)
    
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
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Equations 

            
            </Heading>

            <Card pad="small" margin="small" gap="medium" border="medium">
              <CardHeader>Molar ratio</CardHeader>
              <CardBody>
              <EquationEditor
              value={equation1}
              onChange={setEquation1}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
            />
                </CardBody>
              

            </Card>

            <Card pad="small" margin="small" gap="medium" border="medium">
            <CardHeader>Equation 2</CardHeader>
              <CardBody>
              <EquationEditor
              value={equation2}
              onChange={setEquation2}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
            />
              </CardBody>
              
            </Card>

            <Card pad="small" margin="small" gap="medium" border="medium">
            <CardHeader>Equation 2</CardHeader>
              <CardBody>
              <EquationEditor
                value={equation3}
                onChange={setEquation3}
                autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
                autoOperatorNames="sin cos tan"
              />
              </CardBody>
            </Card>

            <Card pad="small" margin="small" gap="medium" border="medium">

              <CardBody align="center">
              <Add></Add>
              </CardBody>
            </Card>

            

  
          </Box>
        </Box>
      </Box>

            
      <Box flex
        gridArea="main"
      >
        <Box flex

        pad="small">
        <Heading
          level={5}
          margin={{
            "horizontal": "none",
            "top": "medium",
            "bottom": "xsmall",
          }}>
            Select Variables 
        </Heading>
        </Box>
    
        

        

      </Box>

    </Grid>

  );
}
