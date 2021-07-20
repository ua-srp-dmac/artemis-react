import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import PlotBuilder2 from './PlotBuilder2';

import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Tabs,
  Card,
  Heading,
  Select,
  ResponsiveContext,
} from 'grommet';

export default function PlotGrid() {

 
  const [numPlots, setNumPlots] = React.useState(0);

  return (
    
    <Grid
        fill
        // rows={['small', 'small']}
        columns={['1/2', '1/2']}
        align="stretch"
        alignContent="stretch"
       >

      <Box><PlotBuilder2></PlotBuilder2></Box>
      <Box><PlotBuilder2></PlotBuilder2></Box>
      {/* <Box>Item 3</Box>
      <Box>Item 4</Box> */}
    </Grid>

  );
}
