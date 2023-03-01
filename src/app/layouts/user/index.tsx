import React from 'react';

import {
  HStack,
  VStack,
  Box
} from '@chakra-ui/react';

const Component = ({children}) => {
  return (
    <Box w='100%' h='100vh'> 
      {children}
    </Box>
  );
}

export default Component;