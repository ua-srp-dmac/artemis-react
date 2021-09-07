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
  Text,
  Spinner
} from 'grommet';

import { FormClose, FormSearch, Menu } from 'grommet-icons';

import React, { useState, Component, Fragment } from "react";
import axios from 'axios';

import Map from './components/Map';
import AppBar from './components/AppBar';
import SiteLayer from './components/SiteLayer/SiteLayer';

const theme = {
  global: {
    colors: {
      brand: '#00739D',
      'dark-1': '#000000',
      'accent-2': '#A58FAA'
    },
    font: {
      family: 'Lato',
      size: '18px',
    },
    drop: {
      zIndex: 1500,
    }
    
  },
  layer: {
    zIndex: 1000,
  },
  
};

function App() {

  const getSites = () => {
    axios.get('sites')
    .then((response) => {
      setSites(response.data);
      setLoading(false);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [map, setMap] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSite, setShowSite] = useState(false);
  const [zoom, setZoom] = useState(7);
  const [centerLat, setCenterLat] = useState(34.501133);
  const [centerLong, setCenterLong] = useState(-112.252417);

  React.useEffect(() => {
    getSites();
  }, []);
  
  return (
    
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                    map={map}>
            </AppBar>

            <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
              
              <Box flex align='center' justify='center'>

                {showSite && (
                  <SiteLayer setShowSite={setShowSite}
                             showSite={showSite}>
                  </SiteLayer>
                )}
                {!loading && 
                  <Map setShowSite={setShowSite}
                      showSite={showSite}
                      zoom={zoom}
                      centerLat={centerLat}
                      centerLong={centerLong}
                      setZoom={setZoom}
                      setCenterLat={setCenterLat}     
                      setCenterLong={setCenterLong}
                      setMap={setMap}
                      sites={sites}>
                  </Map>
                }

                {loading &&
                  <Spinner />
                }
              </Box>
 
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
