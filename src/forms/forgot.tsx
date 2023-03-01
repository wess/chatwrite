import React from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Link,
  Button,
  useDisclosure,
  Text
} from '@chakra-ui/react';

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
} from 'react-icons/io5';

import {
  TextField,
} from './field';


const validation = object().shape({
  email: string().email('Invalid email').required('Email is required'),
});

const submit = async (values, actions) => {
  actions.setSubmitting(false);

  // const {email, password} = values;

}

const ForgotPassword = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const {email} = props;

  return (
    <>
    <Link onClick={onOpen}>Forgot password?</Link>

    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalBody>
          <Box>
            <Text>
              Enter your email address and we will send you a link to reset your password.
            </Text>
          </Box>
          
          <Box h={5} />
          
          <Formik
            initialValues={{email: email ?? ''}}
            validationSchema={validation}
            onSubmit={submit}
          >
          <Form>
            <Box w="100%">
              <TextField 
                refs={initialRef}
                id="email"
                name="email"
                icon={<IoMail color="rgba(100, 100, 100, 0.5)" />}
                placeholder="Email address"
                type="email"
                as={Field}
              />
              <ErrorMessage name="email"/>
            </Box>
          </Form>
        </Formik>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="green" size="sm" mr={3} onClick={onClose}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
}

export default ForgotPassword;