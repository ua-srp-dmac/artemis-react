import {
  Box,
  Button,
  Heading,
  TextInput,
} from 'grommet';

import { FormClose, FormSearch, Menu } from 'grommet-icons';
import React, { useState } from "react";


const NavBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='start'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

function AppBar(props) {

  const [searchValue, setSearchValue] = useState('');

  return (
    <NavBar>
      <Button
        icon={<Menu />}
        onClick={() => props.setShowSidebar(!props.showSidebar)}
      />
      <Heading level='3' margin='none'>artemis</Heading>
      <Box direction="row" align="center">
        <Box
          margin={{ left: "medium" }}
          round="xsmall"
          background={{ color: "white", opacity: "weak" }}
          direction="row"
          align="center"
          pad={{ horizontal: "small" }}
        >
          <FormSearch color="white" />
          <TextInput plain
            placeholder="Search"
            type="search"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
          />
        </Box>
      </Box>    
    </NavBar>
  );

}

export default AppBar;