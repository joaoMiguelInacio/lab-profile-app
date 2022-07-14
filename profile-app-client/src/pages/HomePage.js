import React from 'react';
import { Button, Container, Flex, Heading } from '@chakra-ui/react';

const Homepage = () => {
  const handleClick = () => console.log("signup");
  const handleClick2 = () => console.log("login");
  return (
    <Flex justify="space-around" m="2vw">
      <Flex w="45%" direction="column" gap="30vh" fontSize="xl">
        <Container>
          <Heading as="h2" size="2xl" noOfLines={1}>
            IronProfile
          </Heading>
          <Heading as="h3" size="lg" fontWeight="normal">
            Today we will create an app with authorisation, adding some cool styles!
          </Heading>
        </Container>
        <Flex direction="column" gap="2vw" fontSize="xl">
        <Button onClick={handleClick} w="50%" alignSelf="center">
            Sign up
          </Button>
          <Button onClick={handleClick2} w="50%" alignSelf="center">
            Log in
          </Button>
        </Flex>
      </Flex>
      <Flex w="45%"></Flex>
    </Flex>
  );
}

export default Homepage;
