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


import Overview from './Overview';
import Geochemistry from './Geochemistry';
import Mineralogy from './Mineralogy';
import MineralogyPlotBuilder from './MineralogyPlotBuilder';
import PlotBuilder from './PlotBuilder';
import PlotBuilder2 from './PlotBuilder2';


function SiteLayer(props) {

  return (
    <Layer
      onEsc={() => props.setShowSite(false)}
      onClickOutside={() => props.setShowSite(false)}
      background='light-2'
      full
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
         
      <Box flex pad="small" fill overflow="auto">
        <Tabs justify="start" alignControls="start" flex fill align="stretch">
          <Tab title="Overview">
            {/* <Box pad="small"> */}
              <Overview></Overview>
              
            {/* </Box> */}
          </Tab>
          <Tab title="Geochemistry">
            <Box pad="small">
              <Geochemistry></Geochemistry>
            </Box>
          </Tab>
          <Tab title="Mineralogy">
            <Box pad="small">
              <MineralogyPlotBuilder></MineralogyPlotBuilder>
            </Box>
          </Tab>
          <Tab title="Plot Builder">
            <Box pad="small">
              {/* <PlotGrid></PlotGrid> */}
              <PlotBuilder></PlotBuilder>
            </Box>
          </Tab>
          <Tab title="Plot Builder 2">
            <Box pad="small">
              {/* <PlotGrid></PlotGrid> */}
              <PlotBuilder2></PlotBuilder2>
            </Box>
          </Tab>
        </Tabs>
      </Box>

      {/* <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'map', start: [0, 0], end: [0, 1] },
            // { name: 'sidebar', start: [0, 1], end: [1, 0] },
            { name: 'main', start: [1, 0], end: [1, 1] },
          ]}>

        <Box
          gridArea="map"
          width="medium">
            <Box flex align='center' justify='center'>
              <SiteMap></SiteMap>
            </Box>
        </Box>
      </Grid> */}

        
    </Layer>
  );
}

export default SiteLayer;