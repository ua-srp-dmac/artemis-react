import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext,
  TextInput
} from 'grommet';
import { FormClose, FormSearch, Menu } from 'grommet-icons';

import React, { useState, Component, Fragment } from "react";
import Map from './components/Map';

const theme = {
  global: {
    colors: {
      brand: '#000000',
    },
    font: {
      family: 'Lato',
      size: '18px',
    },
  },
};

const AppBar = (props) => (
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

function App() {

  const [showSidebar, setShowSidebar] = useState(false);
  const [showSite, setShowSite] = useState(false);
  
  return (
    
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar>
              <Button
                icon={<Menu />}
                onClick={() => setShowSidebar(!showSidebar)}
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
                  <TextInput plain placeholder="Search" type="search" />
                </Box>
              </Box>
              
            </AppBar>
            <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
              <Box flex align='center' justify='center'>
                <Map setShowSidebar={setShowSidebar}
                     showSidebar={showSidebar}>     
                </Map>
              </Box>
              {showSite && (
                <Layer
                  onEsc={() => setShowSite(false)}
                  onClickOutside={() => setShowSite(false)}
                >
                  <Button label="close" onClick={() => setShowSite(false)} />
                </Layer>
              )}
              {(!showSidebar || size !== 'small') ? (
                <Collapsible direction="horizontal" open={showSidebar}>
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
                              onClick={() => setShowSidebar(!showSidebar)} />} />
                    </Box>
       
                  </Box>
                </Collapsible>
              ): (
                <Layer>
                  <Box
                    background='light-2'
                    tag='header'
                    justify='end'
                    align='center'
                    direction='row'
                  >
                  <Button
                    icon={<FormClose />}
                    onClick={() => setShowSidebar(false)}
                  />
                  </Box>
                  <Box
                    fill
                    background='light-2'
                    align='center'
                    justify='center'
                  >
                    sidebar
                  </Box>
                </Layer>
              )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
