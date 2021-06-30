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
import Mineralogy from './Mineralogy';


function SiteLayer(props) {

  return (
    <Layer
      background='light-2'
      margin="small"
      animation="slide"
    >
      
      <Stack>
        <Box flex>
          <Text size="large" margin="medium">Iron King</Text>
        </Box>
        <Box flex>

        </Box>
      </Stack>
      
      <Box flex
           width='medium'>
        Iron King
      </Box>
    </Layer>
  );
}

export default SiteLayer;