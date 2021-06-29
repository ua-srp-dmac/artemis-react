import {
  Box,
  Button,
  Heading,
  Layer,
  Grid,
  Text,
  Tabs,
  Tab,
  TextInput
} from 'grommet';

import { FormClose, FormSearch, Menu } from 'grommet-icons';
import React, { useState } from "react";

function SiteLayer(props) {

  return (
    <Layer
      onEsc={() => props.setShowSite(false)}
      onClickOutside={() => props.setShowSite(false)}
      background='light-2'
      full='true'
      margin="medium"
      animation="slide"
    >
      <Box
        flex
        width='xxlarge'
        background='light-2'
        elevation='small'
      >
        <Button alignSelf="end" icon={<FormClose />} onClick={() => props.setShowSite(!props.showSite)}/>
        {/* <Box
          direction="row"
          align="center"
          as="header"
          justify="between"
        >
          <Heading level={3} margin={{ left: 'small' }}>Iron King</Heading>
          <Button icon={<FormClose />} onClick={() => props.setShowSite(!props.showSite)}/>
        </Box> */}
    
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'sidebar', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] },
          ]}
        >

          <Box
            gridArea="sidebar"
            width="medium"
          >
            <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
              <Text>Iron King</Text>
            </Box>
          </Box>
        
          <Box 
            gridArea="main"
          >
          <Tabs justify="start" alignControls="start">
            <Tab title="tab 1">
              <Box pad="medium">One</Box>
            </Tab>
            <Tab title="tab 2">
              <Box pad="medium">Two</Box>
            </Tab>
          </Tabs>


          </Box>
        </Grid>
      </Box>
    </Layer>
  );
}

export default SiteLayer;