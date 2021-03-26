import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';


function Login({ setIsAuthenticated }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // Controlled form
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/authentication/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        // eu sunt logat
        return res.json();
      
      }

      setError('Invalid credentials');
    }).then((data) => {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        return history.push('/');
      });;
  };

  return (
/*     <form class="loginForm" onSubmit={handleSubmit}>
      <label for="username">
        Username:
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={email}
          onChange={handleEmailChange}
        />
        <br></br>
      <label for="password">
        Password:
        </label>
        <input
        id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      
      {error && <div>{error}</div>}
      <br></br>
      <button type="Submit">Submit</button>
    </form> */


<form  onSubmit={handleSubmit}>
<Box
rounded={'lg'}
bg={useColorModeValue('white', 'gray.700')}
boxShadow={'lg'}
mt="1%"
ml="40%"
mb="1%"
w={"400px"}
p={8}>
<Stack spacing={4}>
  <FormControl id="username">
    <FormLabel>Username</FormLabel>
    <Input onChange={handleUsernameChange} value={username} type="username" />
  </FormControl>
  <FormControl id="password">
    <FormLabel >Password</FormLabel>
    <Input  onChange={handlePasswordChange} value={password} type="password" />
  </FormControl>
  <Stack spacing={10}>
    {error && <div>{error}</div>}
    <Button type="Submit"
      bg={'blue.400'}
      color={'white'}
      _hover={{
        bg: 'blue.500',
      }}>
      Sign in
    </Button>
  </Stack>
</Stack>
</Box>

</form>
  );
}

export default Login;