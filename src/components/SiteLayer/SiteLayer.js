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

import { FormClose, FormSearch, Menu } from 'grommet-icons';
import React, { useState } from "react";

import SiteMap from './SiteMap';
import PeriodicTable from './PeriodicTable';
import Minerology from './Minerology';


function SiteLayer(props) {

  return (
    <Layer
      onEsc={() => props.setShowSite(false)}
      onClickOutside={() => props.setShowSite(false)}
      background='light-2'
      full='true'
      margin="small"
      animation="slide"
    >
      
      <Stack>
        <Box flex>
          <Text size="large" margin="medium">Iron King</Text>
        </Box>
        <Box flex>
          <Button alignSelf="end" icon={<FormClose />} onClick={() => props.setShowSite(!props.showSite)}/>
        </Box>
      </Stack>
      
      <Box flex
           width='xxlarge'>
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'map', start: [0, 0], end: [0, 1] },
            { name: 'sidebar', start: [0, 1], end: [1, 0] },
            { name: 'main', start: [1, 0], end: [1, 1] },
          ]}>

          <Box
            gridArea="map"
            width="medium">
            {/* <Box direction='row' flex overflow={{ horizontal: 'hidden' }}> */}
              <Box flex align='center' justify='center'>
              <SiteMap></SiteMap>
            </Box>
          {/* </Box> */}
          </Box>

          <Box
            gridArea="sidebar"
            width="medium">
            {/* <Box direction='row' flex overflow={{ horizontal: 'hidden' }}> */}
              <Box flex align='center' justify='center'>
              hello
            </Box>
          {/* </Box> */}
          </Box>
          
          <Box gridArea="main">
            <Tabs justify="start" alignControls="start">
              <Tab title="Geochemistry">
                <Box pad="small">
                  <PeriodicTable></PeriodicTable>
                </Box>
              </Tab>
              <Tab title="Minerology">
                <Box pad="small">
                  <Minerology></Minerology>
                </Box>
              </Tab>
            </Tabs>
          </Box>
        </Grid>
      </Box>
    </Layer>
  );
}

export default SiteLayer;