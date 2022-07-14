import React, { useState } from 'react';
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

const SignUp = () => {
  const [input, setInput] = useState('');
  const handleInputChange = e => setInput(e.target.value);
  const isError = input === '';
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClick2 = () => console.log("hey");
  //username, campus, course, image
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
            value={input}
            onChange={handleInputChange}
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
          <Select id="campus" placeholder="Select Campus">
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
          <RadioGroup defaultValue="Web Dev">
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
          <Button onClick={handleClick2} w="50%" alignSelf="center">
            Create the Account
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
