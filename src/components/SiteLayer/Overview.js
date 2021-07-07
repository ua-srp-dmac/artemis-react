import React from 'react';
import Plot from 'react-plotly.js';
import SiteMap from './SiteMap';

import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Tabs,
  Tab,
  Stack,
  Select
} from 'grommet';

export default class Overview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectValue: 'treatment'
    };

  }
  
  render() {

    const site = {
      x: ['0-5', '5-15', '15-25', '25-35', '35-38', '38-54', '180-183'],
      y: [2.8, 3.3, 1.3, 9.1, 4.2, 3.3, 2.3],
      type: 'bar',
      marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    };


    return (
      // <Box flex>
      
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
            {/* <Box flex align='center' justify='center'> */}
              <SiteMap></SiteMap>
              <Box>
              <Select
                options={['treatment', 'pH', 'pHCa', 'EC']}
                value={this.state.selectValue}
                onChange={({ option }) => this.setState({selectValue: option})}
                gridArea="sidebar"
              />
              </Box>
            {/* </Box> */}
        </Box>

        <Box flex
          gridArea="main"
>
            <Box flex align='center' justify='center'>
            <Select
                options={['treatment', 'pH', 'pHCa', 'EC']}
                value={this.state.selectValue}
                onChange={({ option }) => this.setState({selectValue: option})}
              />
            </Box>
        </Box>
      </Grid>

      // </Box>
    );
  }
}