import React from 'react';
import {ID, Query} from 'appwrite';
import dayjs from 'dayjs';

import {
  HStack,
  VStack,
  Heading,
  Box,
  TableContainer,
  Table,
  Tbody,
  Tfoot,
  Tr,
  Td,
  Button,
} from '@chakra-ui/react';

import {
  TextField,
} from '../../forms/field';

import {
  useSession,
  useApi,
} from '../../hooks';

const DB_ID = '63ff8af994e3c1ca7599';
const MSG_ID = '63ff8b0a6ec746fae820';

const Component = (_props) => {
  let bottomRef = React.useRef();

  const {setSession} = useSession();
  let [user, setUser] = React.useState<string>(null);
  let [messages, setMessages] = React.useState([]);
  let [pendingMessage, setPendingMessage] = React.useState('');
  let api = useApi();

  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })      
  }

  const getUser = async () => {
    try {
      let user = await api.account.get();
  
      setUser(user.name);
    } catch (_) {
      setSession(null);
    }
  }

  const sendMessage = async () => {
    if(pendingMessage.length == 0 || pendingMessage == '') return;

    const message = pendingMessage;

    setPendingMessage('');

    await api.database.createDocument(DB_ID, MSG_ID, ID.unique(), {
      user,
      message,
      created: new Date().toISOString(),
    });

    await getMessages();
  }

  const getMessages = async () => {
    const list = await api.database.listDocuments(
      DB_ID, 
      MSG_ID,
      [
        Query.limit(100),
        Query.orderAsc('created'),
        Query.offset(messages.length)
      ]
    );

    const incoming = list.documents.map((doc) => {
      return { 
        id: doc["id"], 
        name: doc["user"], 
        message: doc["message"] ,
        created: dayjs(doc["created"]).format('MM.DD.YY-HH:mm')
      };
    });

    setMessages([
      ...messages,
      ...incoming
    ]);
  };

  const effect = async () => {
    await getUser();

    if(messages.length == 0) await getMessages();

    api.client.subscribe("documents", _res => {
      getMessages();
    }); // messages

    scrollBottom();
  }

  React.useEffect(() => {
    effect();
  }, [effect]);

  if(user == null) {
    return (
      <HStack w='full' h='full'>
        <VStack w='full' h='full'>
          <Heading>Loading...</Heading>
        </VStack>
      </HStack>
    );
  }

  return (
    <HStack w='full' h='full' align='flex-start' bg='gray.200'>
      <VStack h='full' bg='white' align='flex-start' flex={1}>
        <Heading w='full' as='h1' size='sm' bg='gray.200' px={10} py={2}>
          Topic
        </Heading>

        <Box id="chat" w='full' flex={1} overflowX='hidden' overflowY='auto'>
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Tbody>
              {
                messages.map((m, i) => (
                  <Tr key={`chat_${i}`}>
                    <Td>[{m.created}]</Td>
                    <Td>{m.name}: </Td>
                    <Td width='100%'>{m.message}</Td>
                </Tr>  
                ))
              }

              </Tbody>
              <Tfoot ref={bottomRef} />
            </Table>
          </TableContainer>
        </Box>

        <HStack as="form" w='full' px={10} py={4} bg='gray.100' action="#" onSubmit={(e) => {
            e.preventDefault();

            sendMessage();
          }}>
          <TextField 
            id='chat-text' 
            placeholder='Message everyone...'
            value={pendingMessage}
            onChange={e => setPendingMessage(e.target.value)}
          />
          <Button type='submit'>Send</Button>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default Component;