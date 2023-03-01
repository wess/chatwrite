import React from 'react';

import {
  HStack,
  Spacer,
  Heading,
} from '@chakra-ui/react';

const Component = (props) => (
  <HStack 
    as="nav" 
    w="full" 
    h="50px" 
    align="flex-start" 
    alignItems="center" 
    alignContent="center"
    my={8}
    className="landing-nav">

  <Heading size="lg" className="branding" fontSize="24px" fontWeight="700">
    Chatwrite
  </Heading>

  <Spacer/>
</HStack>

);

export default Component;