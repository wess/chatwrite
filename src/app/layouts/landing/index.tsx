import React from 'react';

import {
  VStack,
  Box,
  Container,
} from '@chakra-ui/react';

import Nav from './nav';

const Component = ({children}) => {
  return (
    <VStack w='100%' h='100vh' align='flex-start' className="landing-layout">      
      <Container maxW='container.lg'>
        <Nav/>

        <Box h={20}/>

        <Box w="100%" flex={1}>
          {children}
        </Box>
      </Container>
    </VStack>
  );
};

export default Component;