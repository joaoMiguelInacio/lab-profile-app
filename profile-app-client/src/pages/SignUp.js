import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Select,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Container,
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from './../context/auth.context';

const SignUp = props => {
  
  const [username, setUsername]= useState('');
  const handleUsername = e => setUsername(e.target.value);

  const [password, setPassword]= useState('');
  const handlePassword = e => setPassword(e.target.value);
  
  const [campus, setCampus] = useState('');
  const handleCampus = e => setCampus(e.target.value);

  const [course, setCourse] = useState('Web Dev');

  const isError = username === '';
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const API_URL = 'http://localhost:5005';

  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = { username, password, campus, course};

    axios
      .post(`${API_URL}/api/auth/signup`, requestBody)
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

  return (
    <Flex justify="space-around" m="2vw">
      <Flex w="45%" direction="column" gap="2vw" fontSize="xl">
        <Heading as="h1" size="4xl">
          Sign Up
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
              value = {password}
              onChange={handlePassword}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="campus">Campus</FormLabel>
          <Select id="campus" placeholder="Select Campus" value={campus} onChange={handleCampus}>
            <option>Madrid</option>
            <option>Barcelona</option>
            <option>Miami</option>
            <option>Paris</option>
            <option>Berlin</option>
            <option>Amsterdam</option>
            <option>México</option>
            <option>Sao Paulo</option>
            <option>Lisbon</option>
            <option>Remote</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel as="legend">Course</FormLabel>
          <RadioGroup onChange={setCourse} value={course}>
            <HStack spacing="24px">
              <Radio value="Web Dev">Web Dev</Radio>
              <Radio value="UX/UI">UX/UI</Radio>
              <Radio value="Data Analytics">Data Analytics</Radio>
              <Radio value="Cyber Security">Cyber Security</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </Flex>

      <Flex w="45%" direction="column" justifyContent="space-between" fontSize="xl">
        <Container>
          <Heading as="h2" size="2xl" noOfLines={1}>
            Hello!!
          </Heading>
          <Heading as="h2" size="2xl" fontWeight="normal" noOfLines={1}>
            Welcome to IronProfile!
          </Heading>
        </Container>
        <Flex direction="column" gap="2vw" fontSize="xl">
          <Container>
            If you sign up, you agree with all our terms and conditions where we
            can do whatever we want with the data.
          </Container>
          <Button onClick={handleSubmit} w="50%" alignSelf="center">
            Create the Account
          </Button>
          {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
