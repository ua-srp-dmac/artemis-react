import {
  Box,
  Grommet,
  ResponsiveContext,
  Heading
} from 'grommet';

import React, { useState } from "react";
import axios from 'axios';

import Main from './Main';
import LoginForm from './LoginForm';


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
  card: {
    container: {
      background: '#FFFFFF12',
      elevation: 'none',
    },
  },
  formField: {
    border: {
      side: 'all',
    },
    error: {
      size: 'xsmall',
    },
    help: {
      size: 'xsmall',
    },
    info: {
      size: 'xsmall',
    },
    label: {
      size: 'small',
    },
    round: '4px',
  },
};

function App() {

  const NavBar = (props) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='start'
      background='dark-1'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
    />
  );

  const getAuth = () => {

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    axios.get(`${API_ENDPOINT}/api/auth/`)
      .then(result => {
        setLoggedIn(result.data);
        setLoading(false);
        console.log(result)
      })
      .catch((error) => {
        setLoggedIn(false);
        setLoading(false);
        console.log(error)
        console.log('not logged in')
    });
  }

  const [loggedIn, setLoggedIn] = useState(null)
  const [loading, setLoading] = useState(true)


  React.useEffect(() => {
    getAuth();
  }, []);
  
  return (
    <>
      {/* <Main></Main> */}
      { loggedIn && <Main></Main> }
      { !loggedIn && 
        <Grommet theme={theme} full>
          <ResponsiveContext.Consumer>
            {size => (
              <Box fill>
                <NavBar>
                  <Heading level='3' margin='none'>artemis</Heading>
                </NavBar>
                <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>   
                  <Box flex align='center' justify='center'>
                    <LoginForm setLoggedIn={setLoggedIn}></LoginForm>
                  </Box>
                </Box>
              </Box>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      }
    </>
    

  );
}

export default App;
