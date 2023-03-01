import React from "react";
import {useNavigate} from "react-router-dom";

import {
  HStack,
  VStack,
  Box,
  Button,
  Divider,
  Link,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react'

import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';

import {
  object,
  string
} from 'yup';

import {
  IoMail,
  IoPerson,
} from 'react-icons/io5';

import {
  TextField,
  PasswordField
} from './field';

import {
  useApi,
  useFlash,
} from '../hooks';

import Flash from '../providers/flash';

import ForgotPassword from './forgot';

const validation = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required').min(8),
  name: string().required('Name is required')
});


const Register = (props) => {
  const navigate = useNavigate();
  const api = useApi();
  const [error, setError] = React.useState(null);
  const {setFlash} = useFlash();

  const submit = async (values, actions) => {
    actions.setSubmitting(false);

    const {name, email, password} = values;

    try {
      await api.account.create('unique()', email, password, name);

      setFlash(Flash.success('Account created successfully, please login.'));

      navigate('/');
    } catch(e) {
      setError(e.message);
    }
  }
  

  return (
    <VStack {...props}>
      {error && (
        <Box>
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Box>      
      )}

      <Formik
        initialValues={{email: '', name: '', password: ''}}
        validationSchema={validation}
        onSubmit={submit}
      >
        <Form>
          <Box w="100%">
            <TextField 
              id="email"
              name="email"
              icon={<IoMail color="rgba(100, 100, 100, 0.5)" />}
              placeholder="Email address"
              type="email"
              as={Field}
            />
            <ErrorMessage name="email"/>
          </Box>

          <Box h={4} />

          <Box w="100%">
            <TextField 
              id="name"
              name="name"
              icon={<IoPerson color="rgba(100, 100, 100, 0.5)" />}
              placeholder="Name"
              as={Field}
            />
            <ErrorMessage name="name"/>
          </Box>

          <Box h={4} />

          <Box w="100%">
            <PasswordField 
              id="password"
              name="password"
              as={Field}
            />
            <ErrorMessage name="password"/>
          </Box>

          <Box h={4} />

          <Box w='full'>
            <HStack w='full'>
              <Box flex={1}>
                <ForgotPassword/>
              </Box>
              <Box>
                <Button 
                  variant="solid" 
                  type="submit"
                  colorScheme="green"
                >
                  Submit
                </Button>
              </Box>
            </HStack>
          </Box>

          <Box h={5}/>
          <Divider/>
          <Box h={5}/>

          <Box w='full'>
            <Center>
              <Link w='100%' textAlign="center" href="/">Have an account? Login!</Link>
            </Center>
          </Box>
        </Form>
      </Formik>
    </VStack>
  );
}

export default Register;