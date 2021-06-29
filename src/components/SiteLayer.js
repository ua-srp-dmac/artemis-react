import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext,
  TextInput,
  Grid,
  Text
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
        <Box
          tag="header"
          pad={{ horizontal: 'small', top: 'small', bottom: 'medium' }}
          direction="row"
          justify="between"
          align="center"
        >
          <Heading level={3} size="xsmall" margin="none">
            Iron King
          </Heading>
          <Button icon={<FormClose color="control"
                  onClick={() => props.setShowSite(!props.showSite)} />} />
        </Box>
        
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea="sidebar"
            width="medium"
          >
            <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
              <Text>Visualization options here</Text>
            </Box>
          
          </Box>
        
          <Box gridArea="main" justify="center" align="center">
            <Text>main</Text>
          </Box>
        </Grid>
      </Box>
    </Layer>
  );
}

export default SiteLayer;