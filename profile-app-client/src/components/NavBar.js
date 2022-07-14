import React from 'react';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    
    <ChakraProvider theme={theme}>
    
    <Flex align="center" fontSize="xl" justify="space-between" ml="2vw">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
            <NavLink to="/login">LogIn</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <ColorModeSwitcher m="2vw 2vw auto 75vw " />
    </Flex>

    </ChakraProvider>
    
  )
}

export default NavBar