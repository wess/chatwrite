import React from 'react';

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
  TextField,
} from './field';

import {
  useApi,
  useFlash,
} from '../hooks';

import Flash from '../providers/flash';

const validation = object().shape({
  name: string().required('Name is required')
});

const Person = (props) => {
  const api = useApi();
  const {setFlash} = useFlash();

  const [error, setError] = React.useState(null);

  const submit = async (values, actions) => {
    actions.setSubmitting(false);
  }
}

export default Person;