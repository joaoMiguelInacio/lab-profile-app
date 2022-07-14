import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Container,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './../context/auth.context';

const LogIn = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const API_URL = 'http://localhost:5005';
  const isError = username === '';
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);
  const handleLoginSubmit = e => {
    e.preventDefault();
    const requestBody = { username, password };
    console.log(username, password)
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then(response => {
        console.log('JWT token', response.data.authToken);

        const token = response.data.authToken;
        logInUser(token);
        props.history.push('/');
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleUsername = e => setUsername(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  return (
        <Flex justify="space-around" m="2vw">
          <Flex w="45%" direction="column" gap="2vw" fontSize="xl">
            <Heading as="h1" size="4xl">
              Log in
            </Heading>

            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="username">User Name</FormLabel>
              <Input
                id="username"
                type="username"
                value={username}
                onChange={handleUsername}
              />
              {!isError ? (
                <FormHelperText>Enter your User Name.</FormHelperText>
              ) : (
                <FormErrorMessage>User Name is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel as="legend">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePassword}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Container>
              If you don't have an account yet, you can create your account{' '}
              <Link to="/signup">here</Link>.
            </Container>
          </Flex>

          <Flex
            w="45%"
            direction="column"
            justifyContent="space-between"
            fontSize="xl"
          >
            <Container>
              <Heading as="h2" size="2xl" noOfLines={1}>
                Hello!!
              </Heading>
              <Heading as="h3" size="lg" fontWeight="normal">
                Awesome to have at IronProfile again!
              </Heading>
            </Container>
            <Flex direction="column" gap="2vw" fontSize="xl">
              <Container>
                If you sign up, you agree with all our terms and conditions
                where we can do whatever we want with the data.
              </Container>
              <Button
                type="Submit"
                onClick={handleLoginSubmit}
                w="50%"
                alignSelf="center"
              >
                Login
              </Button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Flex>
          </Flex>
        </Flex>
  );
};

export default LogIn;
