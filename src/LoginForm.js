import React, { useState, Component, Fragment } from "react";

import { StatusGood } from 'grommet-icons';
import { Box, Button, Form, FormField, TextInput, Text } from 'grommet';

import axios from 'axios';

function LoginForm() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState(true)
  const [password, setPassword] = useState(true)

  function login(props) {

    setLoading(true);
    setError(null);
  
    axios.post('/api/login/', {
      username: username,
      password: password,
    })
    .then(result => {
      setLoading(false);
      props.setLoggedIn(result.data);
    })
    .catch((error) => {
      setError(error.response.data);
      setLoading(false);
    });

  }

  return (

    <Box fill align="center" justify="center">
      <Box width="medium" pad={{vertical: 'medium'}}>
        <Text >
          Please log in using your CyVerse credentials.
        </Text>
      </Box>
      
      <Box width="medium">
        <Form
          onSubmit={() => login()}
        > 
          <FormField
            label="Username"
            name="username"
            required
            // validate={[
            //   { regexp: /^[a-z]/i },
            //   name => {
            //     if (name && name.length === 1) return 'must be >1 character';
            //     return undefined;
            //   },
            //   name => {
            //     if (name === 'good')
            //       return {
            //         message: (
            //           <Box align="end">
            //             <StatusGood />
            //           </Box>
            //         ),
            //         status: 'info',
            //       };
            //     return undefined;
            //   },
            // ]}
          />

          <FormField label="Password" name="password" required>
            <TextInput/>
          </FormField>

          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button type="submit" label="Login" primary />
          </Box>
        </Form>
      </Box>
    </Box>

  );
}

export default LoginForm;