import React, { useState, } from "react";

import { Box, Button, Form, FormField, TextInput, Text } from 'grommet';

import axios from 'axios';

function LoginForm(props) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formValue, setFormValue] = useState(true)

 
  const login = () => {

    setLoading(true);
    setError(null);

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    console.log(formValue);
  
    axios.post(`${API_ENDPOINT}/api/login/`, {
      username: formValue.username,
      password: formValue.password,
    })
    .then((result) => {
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
          value={formValue}
          onChange={nextValue => {
            setFormValue(nextValue);
          }}
          onSubmit={() => login()}
        > 
          <FormField
            label="Username"
            name="username"
            required
          />

          <FormField label="Password" name="password" required>
            <TextInput type="password" name="password"></TextInput>
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