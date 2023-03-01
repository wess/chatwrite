import React from 'react';

import {
  Routes,
  Route
} from 'react-router-dom';

import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

import {
  Login,
  Register
} from '../../forms';

const Component = () => (
  <HStack w='full' h='full' align='flex-start'>
    <Box flex={1} mt={10}>
      <Heading>Let's start talking...</Heading>
      <Text>
        Sign up and start talking right now, with our little
        chat app powered by <a href='https://appwrite.io' target='_blank'>Appwrite</a>.
      </Text>
    </Box>

    <Box w='100px' />

    <VStack p={10} align='flex-start' border='1px solid #eaeaea' bg='white'>
      <Routes>
        <Route path='/register' element={
          <>
            <Heading textAlign="left" as='h4' size='lg' mb={2}>Sign up</Heading>
            <Register />
          </>
        } />

        <Route index element={
          <>
            <Heading textAlign="left" as='h4' size='lg' mb={2}>Sign in</Heading>
            <Login />
          </>    
        } />
      </Routes>
    </VStack>
  </HStack>
);

export default Component;