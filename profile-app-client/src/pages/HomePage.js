import React from 'react';
import { Button, Container, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Homepage = () => {
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
        <Button w="50%" alignSelf="center">
            <Link to="/signup">Sign up</Link>
          </Button>
          <Button w="50%" alignSelf="center">
            <Link to="/login">Log in</Link>
          </Button>
        </Flex>
      </Flex>
      <Flex w="45%"></Flex>
    </Flex>
  );
}

export default Homepage;
