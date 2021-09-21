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
  Heading,
  ResponsiveContext,
} from 'grommet';

import {
  BarChart
} from 'grommet-icons';

export default function Calculator(props) {

  const size = useContext(ResponsiveContext);
  const [equation, setEquation] = useState("y=x");

    
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

            <EquationEditor
              value={equation}
              onChange={setEquation}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
            />
          </Box>
        </Box>
      </Box>

            
      <Box flex
        gridArea="main"
      >
    
        

        

      </Box>

    </Grid>

  );
}
