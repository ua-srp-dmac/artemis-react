import React from 'react';
import Plot from 'react-plotly.js';
import PeriodicTable from './PeriodicTable';

import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Tabs,
  Tab,
  Stack
} from 'grommet';

export default class Geochemistry extends React.Component {
  
  render() {

    return (
      // <Box flex>
      
      <Grid
        fill="true"
        rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        areas={[
          { name: 'sidebar', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [1, 0], end: [1, 0] },
        ]}>

        <Box flex
          gridArea="sidebar"
        >     
          <PeriodicTable></PeriodicTable>
        </Box>

        <Box flex
          gridArea="main"
          width="small">
            {/* <Box flex align='center' justify='center'> */}
              Arsenic
            {/* </Box> */}
        </Box>

        
      </Grid>

      // </Box>
    );
  }
}